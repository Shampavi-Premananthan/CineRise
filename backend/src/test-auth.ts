import { hashPassword, comparePassword } from "./utils/password";
import { generateToken, verifyToken } from "./utils/jwt";
import { Role } from "@prisma/client";
import app from "./app";
import http from "http";

async function runTests() {
  console.log("=========================================");
  console.log("🧪 Starting CineRise Day 1 Backend Tests");
  console.log("=========================================");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // 1. Test Password Hashing
  console.log("\n--- Testing Password Hashing & Comparison ---");
  const rawPass = "CineRise@2026";
  const hash = await hashPassword(rawPass);
  assert(hash.startsWith("$2"), "Hash generated in bcrypt format");
  assert(await comparePassword(rawPass, hash), "comparePassword succeeds on correct password");
  assert(!(await comparePassword("WrongPassword", hash)), "comparePassword fails on incorrect password");

  // 2. Test JWT Token Generation & Verification
  console.log("\n--- Testing JWT Token Generation & Verification ---");
  const dummyPayload = {
    id: "user_test_123",
    email: "test@cinerise.com",
    role: Role.FILMMAKER,
    name: "Test Filmmaker",
  };
  const token = generateToken(dummyPayload);
  assert(typeof token === "string" && token.split(".").length === 3, "JWT token generated with 3 parts (header.payload.sig)");

  const decoded = verifyToken(token);
  assert(decoded.id === dummyPayload.id, "Decoded token ID matches");
  assert(decoded.email === dummyPayload.email, "Decoded token email matches");
  assert(decoded.role === dummyPayload.role, "Decoded token role matches");
  assert(decoded.name === dummyPayload.name, "Decoded token name matches");

  // 3. Test Invalid Token
  let invalidTokenFailed = false;
  try {
    verifyToken("invalid.token.signature");
  } catch {
    invalidTokenFailed = true;
  }
  assert(invalidTokenFailed, "verifyToken throws error on invalid token");

  // 4. Test Express App Routes & Middleware
  console.log("\n--- Testing Express App Endpoints & Middleware ---");
  const testServer = http.createServer(app);
  await new Promise<void>((resolve) => testServer.listen(5099, resolve));

  async function apiRequest(path: string, options: { method?: string; headers?: Record<string, string>; body?: any } = {}) {
    const res = await fetch(`http://localhost:5099${path}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const data = await res.json().catch(() => null);
    return { status: res.status, data };
  }

  // Health check
  const health = await apiRequest("/api/health");
  assert(health.status === 200 && health.data?.status === "healthy", "GET /api/health returns 200 OK");

  // Root welcome
  const root = await apiRequest("/");
  assert(root.status === 200 && root.data?.message?.includes("CineRise"), "GET / returns welcome message");

  // Validation: Missing name
  const regNoName = await apiRequest("/api/auth/register", {
    method: "POST",
    body: { email: "test@example.com", password: "password123", role: "Filmmaker" },
  });
  assert(regNoName.status === 400 && regNoName.data?.message?.includes("Name is required"), "Register validation catches missing name");

  // Validation: Invalid email
  const regBadEmail = await apiRequest("/api/auth/register", {
    method: "POST",
    body: { name: "Test User", email: "bad-email", password: "password123", role: "Filmmaker" },
  });
  assert(regBadEmail.status === 400 && regBadEmail.data?.message?.includes("Invalid email"), "Register validation catches invalid email");

  // Validation: Short password
  const regShortPass = await apiRequest("/api/auth/register", {
    method: "POST",
    body: { name: "Test User", email: "test@example.com", password: "123", role: "Filmmaker" },
  });
  assert(regShortPass.status === 400 && regShortPass.data?.message?.includes("at least 6 characters"), "Register validation catches short password");

  // Validation: Invalid role
  const regBadRole = await apiRequest("/api/auth/register", {
    method: "POST",
    body: { name: "Test User", email: "test@example.com", password: "password123", role: "InvalidRole" },
  });
  assert(regBadRole.status === 400 && regBadRole.data?.message?.includes("Valid role is required"), "Register validation catches invalid role");

  // Protected route without token -> 401
  const protectedNoToken = await apiRequest("/api/auth/me");
  assert(protectedNoToken.status === 401, "Protected route /api/auth/me returns 401 when token is missing");

  // Protected route with invalid token -> 401
  const protectedBadToken = await apiRequest("/api/auth/me", {
    headers: { Authorization: "Bearer bad.token.here" },
  });
  assert(protectedBadToken.status === 401, "Protected route returns 401 with malformed token");

  // Role authorization test with Filmmaker token
  const filmmakerToken = generateToken({
    id: "fm_1",
    email: "fm@example.com",
    role: Role.FILMMAKER,
    name: "Filmmaker User",
  });

  const filmmakerAccess = await apiRequest("/api/auth/filmmaker-only", {
    headers: { Authorization: `Bearer ${filmmakerToken}` },
  });
  assert(filmmakerAccess.status === 200, "Filmmaker token can access /filmmaker-only");

  const filmmakerOnCrew = await apiRequest("/api/auth/crew-only", {
    headers: { Authorization: `Bearer ${filmmakerToken}` },
  });
  assert(filmmakerOnCrew.status === 403, "Filmmaker token is forbidden (403) on /crew-only");

  // Role authorization test with Crew token
  const crewToken = generateToken({
    id: "cr_1",
    email: "cr@example.com",
    role: Role.CREW,
    name: "Crew User",
  });

  const crewAccess = await apiRequest("/api/auth/crew-only", {
    headers: { Authorization: `Bearer ${crewToken}` },
  });
  assert(crewAccess.status === 200, "Crew token can access /crew-only");

  const crewOnOrg = await apiRequest("/api/auth/org-only", {
    headers: { Authorization: `Bearer ${crewToken}` },
  });
  assert(crewOnOrg.status === 403, "Crew token is forbidden (403) on /org-only");

  testServer.close();

  console.log("\n=========================================");
  console.log(`Results: ${passed} Passed, ${failed} Failed`);
  console.log("=========================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error("Test execution failed:", e);
  process.exit(1);
});

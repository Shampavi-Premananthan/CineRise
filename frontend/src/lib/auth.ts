/**
 * CineRise JWT helpers
 * Manages token persistence in localStorage.
 */

const TOKEN_KEY = "cinerise_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

export function saveToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
    // Sync to cookie so Next.js middleware (edge runtime) can read it
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    // Clear cookie too
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
  }
}

/**
 * Decode the JWT payload without verifying the signature.
 * Verification happens server-side via /api/auth/me.
 */
export function decodeToken(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload || typeof payload.exp !== "number") return true;
  return Date.now() / 1000 > payload.exp;
}

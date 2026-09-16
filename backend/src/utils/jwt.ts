import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

export interface TokenPayload {
  id: string;
  email: string;
  role: Role;
  name: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "cinerise-super-secret-jwt-key-change-this-in-production";
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"];

/**
 * Generates a signed JWT access token for a user.
 * @param payload User data to encode in token
 * @returns JWT token string
 */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Verifies a JWT token and returns its decoded payload.
 * @param token JWT token string
 * @returns Decoded TokenPayload
 * @throws Error if token is invalid or expired
 */
export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}

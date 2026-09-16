import { Request, Response, NextFunction } from "express";
import { verifyToken, TokenPayload } from "../utils/jwt";

// Extend Express Request interface to include authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

/**
 * Middleware to authenticate requests using JWT Bearer token.
 * Populates `req.user` if valid.
 */
export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: "Access token required. Please log in.",
    });
    return;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    res.status(401).json({
      success: false,
      message: "Invalid authorization header format. Expected 'Bearer <token>'.",
    });
    return;
  }

  const token = parts[1];

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error: any) {
    const message =
      error.name === "TokenExpiredError"
        ? "Token has expired. Please log in again."
        : "Invalid token. Authentication failed.";

    res.status(401).json({
      success: false,
      message,
    });
  }
}

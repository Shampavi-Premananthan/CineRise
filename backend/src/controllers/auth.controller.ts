import { Request, Response } from "express";
import { Role, UserStatus } from "@prisma/client";
import prisma from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

/**
 * Helper to normalize role input string to Prisma Role enum.
 */
function normalizeRole(roleInput?: string): Role | null {
  if (!roleInput) return null;
  const upper = roleInput.trim().toUpperCase();
  if (upper === "FILMMAKER" || upper === "CREW" || upper === "ORGANIZATION" || upper === "ADMIN") {
    return upper as Role;
  }
  return null;
}

/**
 * POST /api/auth/register
 * Registers a new user with name, email, password, role, and preferred language.
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password, role, preferredLanguage, profileImage } = req.body;

    // 1. Basic validation
    if (!name || typeof name !== "string" || !name.trim()) {
      res.status(400).json({
        success: false,
        message: "Name is required.",
      });
      return;
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      res.status(400).json({
        success: false,
        message: "Valid email is required.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim().toLowerCase();
    if (!emailRegex.test(cleanEmail)) {
      res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
      return;
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
      return;
    }

    const normalizedRole = normalizeRole(role);
    if (!normalizedRole) {
      res.status(400).json({
        success: false,
        message: "Valid role is required. Options: Filmmaker, Crew, Organization.",
      });
      return;
    }

    // 2. Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
      return;
    }

    // 3. Hash password
    const passwordHash = await hashPassword(password);

    // 4. Create User in database
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        passwordHash,
        role: normalizedRole,
        preferredLanguage: (preferredLanguage && typeof preferredLanguage === "string") ? preferredLanguage.trim() : "en",
        profileImage: (profileImage && typeof profileImage === "string") ? profileImage.trim() : null,
        status: UserStatus.ACTIVE,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        preferredLanguage: true,
        profileImage: true,
        status: true,
        createdAt: true,
      },
    });

    // 5. Generate JWT token
    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        user: newUser,
        token,
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during registration.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

/**
 * POST /api/auth/login
 * Authenticates user credentials and returns JWT token.
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Find user by email
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    // 2. Check user status
    if (user.status !== UserStatus.ACTIVE) {
      res.status(403).json({
        success: false,
        message: `Account is ${user.status.toLowerCase()}. Please contact support.`,
      });
      return;
    }

    // 3. Compare password
    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    // 4. Generate JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          preferredLanguage: user.preferredLanguage,
          profileImage: user.profileImage,
          status: user.status,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during login.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

/**
 * GET /api/auth/me
 * Returns profile data of the currently authenticated user.
 */
export async function getMe(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        preferredLanguage: true,
        profileImage: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error: any) {
    console.error("GetMe error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import { Role } from "@prisma/client";

const router = Router();

// Public auth routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/me", authenticateToken, getMe);

// Role test endpoints for verification
router.get("/filmmaker-only", authenticateToken, authorizeRoles(Role.FILMMAKER, Role.ADMIN), (req, res) => {
  res.json({ success: true, message: `Welcome Filmmaker ${req.user?.name}!` });
});

router.get("/crew-only", authenticateToken, authorizeRoles(Role.CREW, Role.ADMIN), (req, res) => {
  res.json({ success: true, message: `Welcome Crew Member ${req.user?.name}!` });
});

router.get("/org-only", authenticateToken, authorizeRoles(Role.ORGANIZATION, Role.ADMIN), (req, res) => {
  res.json({ success: true, message: `Welcome Organization ${req.user?.name}!` });
});

export default router;

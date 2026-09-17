import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";

/**
 * Middleware factory to authorize access based on user roles.
 * Must be used AFTER `authenticateToken` middleware.
 * @param allowedRoles One or more Roles permitted to access the route
 */
export function authorizeRoles(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized. Please authenticate first.",
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Forbidden. Role '${req.user.role}' is not authorized to access this resource.`,
      });
      return;
    }

    next();
  };
}

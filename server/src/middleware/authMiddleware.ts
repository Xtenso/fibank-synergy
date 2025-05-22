import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";
import { RoleCode, isValidRole } from "../models/Role";

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: RoleCode;
      };
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "Authentication required" });
      return;
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({ success: false, message: "Invalid token" });
      return;
    }

    if (!isValidRole(decoded.role)) {
      res
        .status(401)
        .json({ success: false, message: "Invalid role in token" });
      return;
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
};

export const authorize = (allowedRoles: RoleCode[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res
        .status(401)
        .json({ success: false, message: "Authentication required" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "You don't have permission to access this resource",
      });
      return;
    }

    next();
  };
};

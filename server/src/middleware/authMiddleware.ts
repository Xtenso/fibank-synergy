import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";
import User from "../models/User";

// Extend Express Request type to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Change return type to Promise<void>
  try {
    // Get token from header
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
      return; // Don't return the response object
    }

    // Verify token
    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({
        success: false,
        message: "Token is not valid or has expired",
      });
      return; // Don't return the response object
    }

    // Add user ID to request object
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
    return; // Don't return the response object
  }
};

export const admin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Change return type to Promise<void>
  try {
    const user = await User.findById(req.userId);

    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Not authorized as an admin",
      });
      return; // Don't return the response object
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error checking permissions",
    });
    // Don't return the response object
  }
};

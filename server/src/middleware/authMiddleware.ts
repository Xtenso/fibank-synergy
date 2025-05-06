import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";
import User from "../models/User";

// include userId in express request for TS so that we can use: req.userId
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
  try {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
      return;
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({
        success: false,
        message: "Token is not valid or has expired",
      });
      return;
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
    return;
  }
};

export const admin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.userId);

    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Not authorized as an admin",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error checking permissions",
    });
  }
};

import { Request, Response } from "express";
import User from "../models/User";
import { sendSuccess, sendError } from "../utils/responseUtils";

// Gets user profile (protected route) -> GET /api/users/me
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, "Authentication required", 401);
      return;
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      sendError(res, "User not found", 404);
      return;
    }

    const userData = {
      id: user._id,
      uin: user.uin,
      uinForeigner: user.uinForeigner,
      nameCyrillic: user.nameCyrillic,
      nameLatin: user.nameLatin,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
    };

    sendSuccess(res, { user: userData }, "User profile retrieved successfully");
  } catch (error) {
    console.error("Get user profile error:", error);
    sendError(res, "Server error when fetching user profile", 500, error);
  }
};

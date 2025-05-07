import { Request, Response } from "express";
import User from "../models/User";

// Gets user profile (protected route) -> GET /api/users/me
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
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
      },
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error when fetching user profile",
      error: (error as Error).message,
    });
  }
};

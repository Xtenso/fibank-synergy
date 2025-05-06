import { Request, Response } from "express";
import User from "../models/User";

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
export const getMe = async (req: Request, res: Response): Promise<void> => {
  // Changed return type to Promise<void>
  try {
    const user = await User.findById(req.userId);

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
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
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

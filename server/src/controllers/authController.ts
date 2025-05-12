import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/jwtUtils";
import { UserRegistrationData, UserLoginData } from "../types/user";

// Register new user -> POST /api/auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      uin,
      uinForeigner,
      nameCyrillic,
      nameLatin,
      email,
      phoneNumber,
      address,
      username,
      password,
    }: UserRegistrationData = req.body;

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
      return;
    }

    // Check if username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      res.status(400).json({
        success: false,
        message: "Username already taken",
      });
      return;
    }

    const user = await User.create({
      uin,
      uinForeigner,
      nameCyrillic,
      nameLatin,
      email,
      phoneNumber,
      address,
      username,
      password,
    });

    const token = generateToken(user._id as string, user.role);

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        uin: user.uin,
        nameCyrillic: user.nameCyrillic,
        nameLatin: user.nameLatin,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: (error as Error).message,
    });
  }
};

// Login user -> POST /api/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: UserLoginData = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    const token = generateToken(user._id as string, user.role);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        uin: user.uin,
        nameCyrillic: user.nameCyrillic,
        nameLatin: user.nameLatin,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: (error as Error).message,
    });
  }
};

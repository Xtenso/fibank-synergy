import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/jwtUtils";
import { UserRegistrationData, UserLoginData } from "../types/user";

// Register new user -> POST /api/auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password }: UserRegistrationData =
      req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
      return;
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    const token = generateToken(user._id as string);

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
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
    const { email, password }: UserLoginData = req.body;

    const user = await User.findOne({ email }).select("+password");

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

    const token = generateToken(user._id as string);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
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

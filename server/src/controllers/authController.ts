import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/jwtUtils";
import { UserRegistrationData, UserLoginData } from "../types/user";

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  // Changed return type to Promise<void>
  try {
    const { firstName, lastName, email, password }: UserRegistrationData =
      req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
      return;
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user._id as string);

    // Send successful response
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

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  // Changed return type to Promise<void>
  try {
    const { email, password }: UserLoginData = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    // Generate token
    const token = generateToken(user._id as string);

    // Send successful response
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

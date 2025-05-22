import { Request, Response } from "express";
import User, {
  UserRegistrationData,
  UserLoginData,
  UserPopulated,
} from "../models/User";
import Role, { RoleCode } from "../models/Role";
import { generateToken } from "../utils/jwtUtils";
import { sendSuccess, sendError } from "../utils/responseUtils";

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

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
      return;
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      res.status(400).json({
        success: false,
        message: "Username already taken",
      });
      return;
    }

    const defaultRole = await Role.findOne({ code: "user" });
    if (!defaultRole) {
      res.status(500).json({
        success: false,
        message: "Default role not found",
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
      role: defaultRole._id,
    });

    const populatedUser = (await User.findById(user._id)
      .populate("role")
      .lean()) as UserPopulated | null;
    const roleCode = populatedUser?.role?.code || "user";

    const token = generateToken(user._id as string, roleCode as RoleCode);

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        uin: user.uin,
        nameCyrillic: user.nameCyrillic,
        nameLatin: user.nameLatin,
        email: user.email,
        username: user.username,
        role: roleCode,
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
      sendError(res, "Invalid credentials", 401);
      return;
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      sendError(res, "Invalid credentials", 401);
      return;
    }

    const populatedUser = (await User.findById(user._id)
      .populate("role")
      .lean()) as UserPopulated | null;

    if (!populatedUser || !populatedUser.role) {
      sendError(res, "User role not found", 500);
      return;
    }

    const roleCode = populatedUser.role.code as RoleCode;

    const token = generateToken(user._id as string, roleCode);

    const userData = {
      id: user._id,
      uin: user.uin,
      nameCyrillic: user.nameCyrillic,
      nameLatin: user.nameLatin,
      email: user.email,
      username: user.username,
      role: roleCode,
    };

    sendSuccess(res, { user: userData, token }, "Login successful", 200);
  } catch (error) {
    sendError(res, "Login failed", 500, error);
  }
};

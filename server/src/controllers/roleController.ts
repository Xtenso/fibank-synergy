import { Request, Response } from "express";
import Role from "../models/Role";
import { sendSuccess, sendError } from "../utils/responseUtils";

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find();
    sendSuccess(res, roles, "Roles retrieved successfully");
  } catch (error: any) {
    sendError(res, "Failed to fetch roles", 500, error);
  }
};

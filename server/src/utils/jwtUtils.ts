import jwt from "jsonwebtoken";
import { JwtPayload } from "../types";
import { RoleCode } from "../models/Role";

export const generateToken = (userId: string, role: RoleCode): string => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
    /*expiresIn: process.env.JWT_EXPIRES_IN as string|| "1d",*/
  });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  } catch (error) {
    return null;
  }
};

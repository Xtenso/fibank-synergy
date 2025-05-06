import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/user";

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
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

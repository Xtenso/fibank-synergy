import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface JwtPayload {
  id: string;
}

import { Document } from "mongoose";

export interface IUser extends Document {
  uin: string;
  uinForeigner?: string;
  nameCyrillic: string;
  nameLatin: string;
  email: string;
  phoneNumber: string;
  address: string;
  username: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UserRegistrationData {
  uin: string;
  uinForeigner?: string;
  nameCyrillic: string;
  nameLatin: string;
  email: string;
  phoneNumber: string;
  address: string;
  username: string;
  password: string;
}

export interface UserLoginData {
  username: string;
  password: string;
}

export interface JwtPayload {
  id: string;
  role: "user" | "admin";
}

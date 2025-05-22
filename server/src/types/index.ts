import { RoleCode } from "../models/Role";

export interface JwtPayload {
  id: string;
  role: RoleCode;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

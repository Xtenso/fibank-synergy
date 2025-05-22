import { Response } from "express";
import { ApiResponse } from "../types";

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message?: string,
  statusCode: number = 200
): void => {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };

  if (message) {
    response.message = message;
  }

  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  error?: any
): void => {
  const response: ApiResponse<null> = {
    success: false,
    message,
  };

  if (error && process.env.NODE_ENV !== "production") {
    response.error = typeof error === "object" ? error.message : String(error);
  }

  res.status(statusCode).json(response);
};

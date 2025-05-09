import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types/user";

const UserSchema: Schema = new Schema({
  uin: {
    type: String,
    required: [true, "UIN is required"],
    trim: true,
    validate: [
      {
        validator: (value: string) => value.length === 10,
        message: "UIN must be 10 characters long",
      },
      {
        validator: (value: string) => /^[0-9]+$/.test(value),
        message: "UIN can only contain numbers",
      },
    ],
  },
  uinForeigner: {
    type: String,
    required: false,
    trim: true,
  },
  nameCyrillic: {
    type: String,
    required: [true, "Name in Cyrillic is required"],
    trim: true,
    validate: [
      {
        validator: (value: string) => /^[\u0400-\u04FF\s-]+$/.test(value),
        message: "Please use only Cyrillic characters",
      },
      {
        validator: (value: string) => value.trim().split(/\s+/).length >= 2,
        message: "Please enter full name (first and last name)",
      },
      {
        validator: (value: string) =>
          !value
            .trim()
            .split(/\s+/)
            .some((part) => part.length < 3),
        message: "Each part of your name must be at least 3 characters",
      },
    ],
  },
  nameLatin: {
    type: String,
    required: [true, "Name in Latin is required"],
    trim: true,
    validate: [
      {
        validator: (value: string) => /^[A-Za-z\s-]+$/.test(value),
        message: "Please use only Latin characters",
      },
      {
        validator: (value: string) => value.trim().split(/\s+/).length >= 2,
        message: "Please enter full name (first and last name)",
      },
      {
        validator: (value: string) =>
          !value
            .trim()
            .split(/\s+/)
            .some((part) => part.length < 3),
        message: "Each part of your name must be at least 3 characters",
      },
    ],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value: string) => /^\S+@\S+\.\S+$/.test(value),
      message: "Email is invalid",
    },
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    validate: [
      {
        validator: (value: string) => value.length >= 10,
        message: "Phone number must be at least 10 characters long",
      },
      {
        validator: (value: string) => /^\+?[0-9\s-]+$/.test(value),
        message: "Phone number can only contain numbers, spaces, + and -",
      },
    ],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
    validate: {
      validator: (value: string) => value.length >= 10,
      message: "Address must be at least 10 characters long",
    },
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    validate: [
      {
        validator: (value: string) => value.length >= 5,
        message: "Username must be at least 5 characters long",
      },
      {
        validator: (value: string) => /^[a-zA-Z_-]+$/.test(value),
        message: "Username can only contain Latin letters, _ and -",
      },
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: [
      {
        validator: (value: string) => value.length >= 6,
        message: "Password must be at least 6 characters",
      },
      {
        validator: (value: string) => value.length <= 24,
        message: "Password must be at most 24 characters",
      },
      {
        validator: (value: string) => /[a-zA-Z]/.test(value),
        message: "Password must contain at least one letter",
      },
      {
        validator: (value: string) => /[0-9]/.test(value),
        message: "Password must contain at least one number",
      },
      {
        validator: (value: string) =>
          /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(value),
        message:
          "Password can only contain Latin letters, numbers, and special characters",
      },
    ],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;

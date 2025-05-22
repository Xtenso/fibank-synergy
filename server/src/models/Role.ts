import mongoose, { Document, Schema } from "mongoose";

export const ROLE_CODES = ["user", "admin", "company"] as const;
export type RoleCode = (typeof ROLE_CODES)[number];

export function isValidRole(role: string): role is RoleCode {
  return ROLE_CODES.includes(role as RoleCode);
}

export interface Role {
  code: RoleCode;
  name: string;
  description?: string;
}

export interface RoleDocument extends Document, Role {
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema: Schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v: string) => isValidRole(v),
        message: (props: { value: string }) =>
          `${props.value} is not a valid role code`,
      },
    },
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<RoleDocument>("Role", RoleSchema);

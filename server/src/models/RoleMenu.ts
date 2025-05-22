import mongoose, { Document, Schema } from "mongoose";

export interface RoleMenu {
  roleId: mongoose.Types.ObjectId;
  menuId: mongoose.Types.ObjectId;
}

export interface RoleMenuDocument extends Document, RoleMenu {
  createdAt: Date;
  updatedAt: Date;
}

const RoleMenuSchema: Schema = new Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
  },
  { timestamps: true }
);

// roleId + menuId = single unique index
RoleMenuSchema.index({ roleId: 1, menuId: 1 }, { unique: true });

export default mongoose.model<RoleMenuDocument>("RoleMenu", RoleMenuSchema);

import mongoose, { Document, Schema } from "mongoose";

export interface Menu {
  key: string;
  href: string;
  icon: string;
  parentId: mongoose.Types.ObjectId | null;
  order: number;
  isActive: boolean;
}

export interface MenuDocument extends Document, Menu {
  createdAt: Date;
  updatedAt: Date;
}

const MenuSchema: Schema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    href: { type: String, required: true },
    icon: { type: String, required: true },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      default: null,
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<MenuDocument>("Menu", MenuSchema);

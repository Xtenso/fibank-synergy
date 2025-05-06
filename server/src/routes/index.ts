import { Application } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";

export const initializeRoutes = (app: Application): void => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);

  app.get("/", (req, res) => {
    res.send("FiBank Synergy API is running...");
  });
};

export default initializeRoutes;

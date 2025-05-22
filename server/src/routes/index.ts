import { Application } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import roleRoutes from "./roleRoutes";
import menuRoutes from "./menuRoutes";

export const initializeRoutes = (app: Application): void => {
  const apiPrefix = "/api";

  app.use(`${apiPrefix}/auth`, authRoutes);
  app.use(`${apiPrefix}/users`, userRoutes);
  app.use(`${apiPrefix}/roles`, roleRoutes);
  app.use(`${apiPrefix}/menus`, menuRoutes);

  app.get("/", (req, res) => {
    res.send("FiBank Synergy API is running...");
  });

  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
    });
  });
};

export default initializeRoutes;

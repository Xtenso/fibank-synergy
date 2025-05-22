import { Router } from "express";
import { getMenus } from "../controllers/menuController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, getMenus);

export default router;

import { Router } from "express";
import { getRoles } from "../controllers/roleController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, authorize(["admin"]), getRoles);

export default router;

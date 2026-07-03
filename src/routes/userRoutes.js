import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/updateUserController.js";

const router = Router();

router.put("/", authMiddleware, updateUserController);

export default router;

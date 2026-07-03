import express from "express";
import { addProductController } from "../controllers/addProductController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminOnly.js";
const router = express.Router();

router.post("/", authMiddleware, adminOnly, addProductController);

export default router;

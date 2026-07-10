import express from "express";
import { addReviewController } from "../controllers/addReviewController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:productId", authMiddleware, addReviewController);

export default router;

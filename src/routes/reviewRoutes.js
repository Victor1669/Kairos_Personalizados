import express from "express";
import { addReviewController } from "../controllers/addReviewController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getReviewController } from "../controllers/getReviewsController.js";
const router = express.Router();

router.post("/:productId", authMiddleware, addReviewController);
router.get("/:productId", getReviewController);
export default router;

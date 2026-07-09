import { Router } from "express";
import { createCartController } from "../controllers/cartController.js";
import { addCartItemController } from "../controllers/createCarItemController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createCartController);
router.post("/items", authMiddleware, addCartItemController);

export default router;

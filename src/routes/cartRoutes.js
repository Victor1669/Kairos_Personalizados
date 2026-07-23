import { Router } from "express";
import { createCartController } from "../controllers/cartController.js";
import { addCartItemController } from "../controllers/createCarItemController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { updateCartItemQuantityController } from "../controllers/updateCartItemQuantityController.js";
import { deleteCartItemController } from "../controllers/deleteCartItemController.js";
import { getCartController } from "../controllers/getCartController.js";
const router = Router();

router.post("/", authMiddleware, createCartController);
router.post("/items", authMiddleware, addCartItemController);
router.patch(
  "/items/:cartItemId/quantity",
  authMiddleware,
  updateCartItemQuantityController,
);

router.get("/", authMiddleware, getCartController);

router.delete("/item/:cartItemId", authMiddleware, deleteCartItemController);
export default router;

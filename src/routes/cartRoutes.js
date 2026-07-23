import { Router } from "express";
import { createCartController } from "../controllers/cartController.js";
import { addCartItemController } from "../controllers/createCarItemController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getCartItemController } from "../controllers/getCartItemController.js";
import { updateCartItemQuantityController } from "../controllers/updateCartItemQuantityController.js";
import { deleteCartItemController } from "../controllers/deleteCartItemController.js";
const router = Router();

router.post("/", authMiddleware, createCartController);
router.post("/items", authMiddleware, addCartItemController);
router.get("/:cartId", authMiddleware, getCartItemController);
router.patch(
  "/items/:cartItemId/quantity",
  authMiddleware,
  updateCartItemQuantityController,
);
router.delete("/item/:cartItemId", authMiddleware, deleteCartItemController);
export default router;

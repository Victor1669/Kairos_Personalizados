import express from "express";
import { addProductController } from "../controllers/addProductController.js";
import { updateProductController } from "../controllers/updateProductController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { deleteProductController } from "../controllers/deleteProductController.js";
import adminOnly from "../middlewares/adminOnly.js";
const router = express.Router();

router.post("/", authMiddleware, adminOnly, addProductController);
router.put("/:id", authMiddleware, updateProductController);
router.delete("/:id", authMiddleware, deleteProductController);
export default router;

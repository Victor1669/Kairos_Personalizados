import express from "express";
import upload from "../config/multer.js";

import { addProductController } from "../controllers/addProductController.js";
import { updateProductController } from "../controllers/updateProductController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { deleteProductController } from "../controllers/deleteProductController.js";
import adminOnly from "../middlewares/adminOnly.js";
import { getProductsController } from "../controllers/getProductsController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  adminOnly,
  upload.single("image"),
  addProductController,
);

router.put("/:id", authMiddleware, updateProductController);
router.delete("/:id", authMiddleware, deleteProductController);
router.get("/", getProductsController);

export default router;

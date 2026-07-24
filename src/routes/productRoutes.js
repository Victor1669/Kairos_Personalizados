import express from "express";
import upload from "../config/multer.js";

import { addProductController } from "../controllers/addProductController.js";
import { updateProductController } from "../controllers/updateProductController.js";
import { deleteProductController } from "../controllers/deleteProductController.js";
import { getProductsController } from "../controllers/getProductsController.js";
import { getProductByIdController } from "../controllers/getProductByIdController.js";
import { getProductByCodeController } from "../controllers/getProductByCodeController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminOnly.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  adminOnly,
  upload.single("image"),
  addProductController,
);
router.put(
  "/:id",
  authMiddleware,
  adminOnly,
  upload.single("image"),
  updateProductController,
);
router.delete("/:id", authMiddleware, adminOnly, deleteProductController);
router.get(
  "/code/:code",
  authMiddleware,
  adminOnly,
  getProductByCodeController,
);
router.get("/", getProductsController);
router.get("/:id", getProductByIdController);

export default router;

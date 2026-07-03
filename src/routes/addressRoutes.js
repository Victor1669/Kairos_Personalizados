import { Router } from "express";
import { addressRegisterController } from "../controllers/addressRegisterController.js";
import { updateAddressController } from "../controllers/updateAddressController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { deleteAddressController } from "../controllers/deleteAddressController.js";
const router = Router();

router.post("/", authMiddleware, addressRegisterController);
router.put("/", authMiddleware, updateAddressController);
router.delete("/:id", authMiddleware, deleteAddressController);
export default router;

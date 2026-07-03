import { Router } from "express";
import { addressRegisterController } from "../controllers/AddressRegisterController.js";
import { updateAddressController } from "../controllers/updateAddressController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, addressRegisterController);
router.put("/", authMiddleware, updateAddressController);

export default router;

import { Router } from "express";

import { registerController } from "../controllers/registerController.js";
import { loginController } from "../controllers/loginController.js";
import { refreshTokenController } from "../controllers/refreshTokenController.js";
import {
  sendRecoveryCodeController,
  resetPasswordController,
} from "../controllers/recoveryPasswordController.js";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/refresh", refreshTokenController);

router.post("/recovery-password", sendRecoveryCodeController);

router.post("/reset-password", resetPasswordController);

export default router;

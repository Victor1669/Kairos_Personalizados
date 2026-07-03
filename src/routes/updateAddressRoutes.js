import express from "express";
import { updateAddressController } from "../controllers/updateAddressController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const Router = express();

Router.put("/address", authMiddleware, updateAddressController);

export default Router;

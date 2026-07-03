import { addProductService } from "../services/addProductService.js";
import AppDataSource from "../config/dbconnect.js";
export const addProductController = async (req, res) => {
  try {
    const product = await addProductService(req.body);

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.log("ERRO REAL:", err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

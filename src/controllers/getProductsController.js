import { getProductsService } from "../services/getProductsService.js";

export const getProductsController = async (req, res) => {
  try {
    const products = await getProductsService();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

import { getProductByIdService } from "../services/getProductByIdService.js";

export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductByIdService(id);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

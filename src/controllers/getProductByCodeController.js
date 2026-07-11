import { getProductByCodeService } from "../services/getProductByCodeService.js";

export const getProductByCodeController = async (req, res) => {
  try {
    const { code } = req.params;

    const product = await getProductByCodeService(code);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

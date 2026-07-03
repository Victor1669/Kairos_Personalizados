import { updateProductService } from "../services/UpdateProductService.js";

export const updateProductController = async (req, res) => {
  try {
    const user = req.user;
    const productId = req.params.id;
    const data = req.body;

    const product = await updateProductService(user, productId, data);

    return res.status(200).json({
      message: "Produto atualizado com sucesso",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

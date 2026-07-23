import { getCartService } from "../services/getCartService.js";

export const getCartController = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await getCartService(userId);

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar carrinho",
    });
  }
};

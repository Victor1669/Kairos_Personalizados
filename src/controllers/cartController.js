import { createCartService } from "../services/createCartService.js";

export const createCartController = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await createCartService(userId);

    return res.status(201).json({
      message: "Carrinho criado com sucesso",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

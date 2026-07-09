import { addCartItemService } from "../services/addCartItemService.js";

export const addCartItemController = async (req, res) => {
  try {
    const { productId, color, size, quantity } = req.body;

    const userId = req.user.id;

    const result = await addCartItemService(
      userId,
      productId,
      color,
      size,
      quantity,
    );

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

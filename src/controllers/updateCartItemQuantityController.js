import { updateCartItemQuantityService } from "../services/updateCartItemQuantityService.js";

export const updateCartItemQuantityController = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const userId = req.user.id;

    const result = await updateCartItemQuantityService(
      userId,
      Number(cartItemId),
      Number(quantity),
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

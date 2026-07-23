import { getCartItemService } from "../services/getCartItemsService.js";

export const getCartItemController = async (req, res) => {
  try {
    const { cartId } = req.params;

    const userId = req.user.id;

    const cart = await getCartItemService(userId, cartId);

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

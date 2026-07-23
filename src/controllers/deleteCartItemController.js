import { deleteCartItemService } from "../services/deleteCartItemService.js";

export const deleteCartItemController = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const userId = req.user.id;

    const result = await deleteCartItemService(userId, Number(cartItemId));

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

import { deleteProductService } from "../services/deleteProductService.js";

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteProductService(req.user, id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

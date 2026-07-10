import { addReviewService } from "../services/addReviewService.js";

export const addReviewController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { stars, description } = req.body;

    const userId = req.user.id;

    const result = await addReviewService(
      userId,
      productId,
      stars,
      description,
    );

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

import { getReviewService } from "../services/getReviewsService.js";

export const getReviewController = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await getReviewService(Number(productId));

    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

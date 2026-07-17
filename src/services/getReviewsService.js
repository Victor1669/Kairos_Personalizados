import AppDataSource from "../config/dbconnect.js";
import Review from "../model/Review.js";

export const getReviewService = async (productId) => {
  const reviewRepository = AppDataSource.getRepository(Review);

  const reviews = await reviewRepository.find({
    where: {
      product: {
        id: productId,
      },
    },
    relations: {
      user: true,
    },
  });

  return reviews.map((review) => ({
    id: review.id,
    stars: review.stars,
    description: review.description,
    user: review.user.name,
  }));
};

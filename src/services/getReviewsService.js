import AppDataSource from "../config/dbconnect.js";
import Review from "../model/Review.js";
import Product from "../model/Product.js";
import User from "../model/User.js";
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

  if (reviews.length === 0) {
    throw new Error("Sem reviews para este produto!");
  }

  return reviews.map((review) => ({
    id: review.id,
    stars: review.stars,
    description: review.description,
    user: review.user.name,
  }));
};

import AppDataSource from "../config/dbconnect.js";
import Review from "../model/Review.js";
import Product from "../model/Product.js";
import User from "../model/User.js";
export const addReviewService = async (
  userId,
  productId,
  stars,
  description,
) => {
  const userRepository = AppDataSource.getRepository(User);
  const productRepository = AppDataSource.getRepository(Product);
  const reviewRepository = AppDataSource.getRepository(Review);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const product = await productRepository.findOne({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  if (stars < 1 || stars > 5) {
    throw new Error("A avaliação deve conter entre 1 e 5 estrelas.");
  }

  const review = reviewRepository.create({
    stars,
    description,
    user: user.id,
    product,
  });

  const createdReview = await reviewRepository.save(review);

  return {
    message: "Avaliação publicada com sucesso.",
    createdReview,
  };
};

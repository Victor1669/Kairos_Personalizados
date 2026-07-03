import AppDataSource from "../config/dbconnect.js";
import Product from "../model/Product.js";

export const getProductsService = async () => {
  const productRepository = AppDataSource.getRepository(Product);

  const products = await productRepository.find({
    select: {
      id: true,
      nome: true,
      color: true,
      description: true,
      code: true,
      size: true,
      price: true,
    },
  });

  return products;
};

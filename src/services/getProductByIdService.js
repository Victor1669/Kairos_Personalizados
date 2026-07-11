import AppDataSource from "../config/dbconnect.js";
import Product from "../model/Product.js";

export const getProductByIdService = async (id) => {
  const productRepository = AppDataSource.getRepository(Product);

  const product = await productRepository.findOne({
    where: {
      id: Number(id),
    },
    relations: {
      images: true,
    },
  });

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  product.images.sort((a, b) => a.order - b.order);

  return {
    id: product.id,
    nome: product.nome,
    color: product.color,
    description: product.description,
    code: product.code,
    size: product.size,
    price: product.price,
    images: product.images,
  };
};

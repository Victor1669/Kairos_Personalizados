import AppDataSource from "../config/dbconnect.js";
import Product from "../model/Product.js";

export const getProductByCodeService = async (code) => {
  const productRepository = AppDataSource.getRepository(Product);

  const product = await productRepository.findOne({
    where: {
      code: code,
    },
    relations: {
      images: true,
    },
  });

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  return {
    id: product.id,
    nome: product.nome,
    color: product.color,
    description: product.description,
    code: product.code,
    size: product.size,
    price: product.price,
    image: product.images.sort((a, b) => a.order - b.order)[0]?.img_url ?? null,
  };
};

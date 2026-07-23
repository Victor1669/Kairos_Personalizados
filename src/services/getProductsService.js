import AppDataSource from "../config/dbconnect.js";
import Product from "../model/Product.js";

export const getProductsService = async () => {
  const productRepository = AppDataSource.getRepository(Product);

  const products = await productRepository.find({
    relations: {
      images: true,
    },
  });

  return products.map((product) => ({
    id: product.id,
    nome: product.nome,
    color: product.color,
    description: product.description,
    code: product.code,
    size: product.size,
    price: product.price,
    image: product.images.sort((a, b) => a.order - b.order)[0]?.img_url ?? null,
    status: product.status,
  }));
};

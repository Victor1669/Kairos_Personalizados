import AppDataSource from "../config/dbconnect.js";
import Produto from "../model/Product.js";

export const updateProductService = async (user, productId, data) => {
  const productRepository = AppDataSource.getRepository(Produto);

  if (user.role !== "admin") {
    throw new Error("Usuário não autorizado");
  }

  const product = await productRepository.findOne({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Produto não encontrado");
  }

  product.nome = data.nome ?? product.nome;
  product.color = data.color ?? product.color;
  product.price = data.price ?? product.price;
  product.size = data.size ?? product.size;
  product.description = data.description ?? product.description;

  await productRepository.save(product);

  return product;
};

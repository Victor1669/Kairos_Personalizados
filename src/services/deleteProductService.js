import AppDataSource from "../config/dbconnect.js";
import Produto from "../model/Product.js";

export const deleteProductService = async (user, productId) => {
  if (user.role !== "admin") {
    throw new Error("Apenas administradores podem deletar produtos.");
  }

  const productRepository = AppDataSource.getRepository(Produto);

  const product = await productRepository.findOne({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  await productRepository.remove(product);

  return {
    message: "Produto deletado com sucesso.",
  };
};

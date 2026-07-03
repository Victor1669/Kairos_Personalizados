import AppDataSource from "../config/dbconnect.js";
import Produto from "../model/Product.js";
export const addProductService = async (data) => {
  const productRepository = AppDataSource.getRepository(Produto);

  const { nome, color, size, price, description } = data;

  if (!nome || !color || !size || !price || !description) {
    throw new Error("ALL_FIELDS_REQUIRED");
  }

  const sizes = Array.isArray(size) ? size : [size];
  const lastProduct = await productRepository.findOne({
    where: {},
    order: { id: "DESC" },
  });
  const lastNumber = lastProduct
    ? parseInt(lastProduct.code.replace("PRD", "")) + 1
    : 1;

  const code = `PRD${String(lastNumber).padStart(4, "0")}`;

  const product = productRepository.create({
    nome,
    color,
    size: sizes,
    price,
    description,
    code,
  });

  await productRepository.save(product);

  return product;
};

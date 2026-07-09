import AppDataSource from "../config/dbconnect.js";
import Produto from "../model/Product.js";
import ProductImg from "../model/ProductImg.js";

export const addProductService = async (data) => {
  const productRepository = AppDataSource.getRepository(Produto);
  const imageRepository = AppDataSource.getRepository(ProductImg);

  const { nome, color, size, price, description, imageUrl, publicId } = data;

  if (
    !nome ||
    !color ||
    !size ||
    !price ||
    !description ||
    !imageUrl ||
    !publicId
  ) {
    throw new Error("Todos os campos devem ser preenchidos.");
  }

  const sizes = Array.isArray(size) ? size : [size];
  const colors = Array.isArray(color) ? color : [color];

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
    color: colors,
    size: sizes,
    price,
    description,
    code,
  });

  await productRepository.save(product);

  const image = imageRepository.create({
    img_url: imageUrl,
    public_id: publicId,
    order: 1,
    product,
  });

  await imageRepository.save(image);

  return product;
};

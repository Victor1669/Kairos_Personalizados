import AppDataSource from "../config/dbconnect.js";
import Product from "../model/Product.js";
import User from "../model/User.js";
import Cart from "../model/Cart.js";
import CartItem from "../model/CartItem.js";
import { createCartService } from "./createCartService.js";

export const addCartItemService = async (
  userId,
  productId,
  color,
  size,
  quantity,
) => {
  const userRepository = AppDataSource.getRepository(User);
  const productRepository = AppDataSource.getRepository(Product);
  const cartRepository = AppDataSource.getRepository(Cart);
  const cartItemRepository = AppDataSource.getRepository(CartItem);

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const product = await productRepository.findOne({
    where: { id: productId },
  });

  if (!product) {
    throw new Error("Produto não encontrado");
  }

  let cart = await cartRepository.findOne({
    where: {
      user: {
        id: userId,
      },
      status: "ativo",
    },
    relations: {
      user: true,
    },
  });

  if (!cart) {
    cart = await createCartService(userId);
  }

  const existingCartItem = await cartItemRepository.findOne({
    where: {
      cart: {
        id: cart.id,
      },
      product: {
        id: product.id,
      },
      color,
      size,
    },
  });

  if (existingCartItem) {
    existingCartItem.quantity += quantity;

    await cartItemRepository.save(existingCartItem);

    return {
      message: "Quantidade do produto atualizada no carrinho.",
      cartItem: existingCartItem,
    };
  }

  const cartItem = cartItemRepository.create({
    cart,
    product,
    color,
    size,
    quantity,
    unit_price: product.price,
  });

  await cartItemRepository.save(cartItem);

  return {
    message: "Produto adicionado ao carrinho.",
    cartItem,
  };
};

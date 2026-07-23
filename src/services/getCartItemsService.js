import AppDataSource from "../config/dbconnect.js";
import CartItem from "../model/CartItem.js";
import Cart from "../model/Cart.js";

export const getCartItemService = async (userId, cartId) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const cartItemRepository = AppDataSource.getRepository(CartItem);

  const cart = await cartRepository.findOne({
    where: {
      id: cartId,
      user: {
        id: userId,
      },
    },
  });

  if (!cart) {
    throw new Error("Carrinho não encontrado");
  }

  const cartItems = await cartItemRepository.find({
    where: {
      cart: {
        id: cart.id,
      },
    },
    relations: {
      product: true,
    },
  });

  return {
    cart,
    items: cartItems,
  };
};

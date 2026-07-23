import AppDataSource from "../config/dbconnect.js";
import Cart from "../model/Cart.js";

export const getCartService = async (userId) => {
  const cartRepository = AppDataSource.getRepository(Cart);

  const cart = await cartRepository.findOne({
    where: {
      user: {
        id: userId,
      },
      status: "ativo",
    },
    relations: {
      items: {
        product: true,
      },
    },
  });

  if (!cart) {
    return {
      message: "Carrinho vazio",
      cart: [],
    };
  }

  return {
    message: "Carrinho encontrado",
    cart,
  };
};

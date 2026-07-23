import Cart from "../model/Cart.js";
import AppDataSource from "../config/dbconnect.js";
import User from "../model/User.js";

export const createCartService = async (userId) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const existingCart = await cartRepository.findOne({
    where: {
      user: {
        id: userId,
      },
      status: "ativo",
    },
  });

  if (existingCart) {
    return existingCart;
  }

  const cart = cartRepository.create({
    user,
    status: "ativo",
  });

  return await cartRepository.save(cart);
};

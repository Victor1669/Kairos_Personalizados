import AppDataSource from "../config/dbconnect.js";
import Cart from "../model/Cart.js";
import CartItem from "../model/CartItem.js";

export const deleteCartItemService = async (userId, cartItemId) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const cartItemRepository = AppDataSource.getRepository(CartItem);

  const cart = await cartRepository.findOne({
    where: {
      user: {
        id: userId,
      },
      status: "ativo",
    },
  });

  if (!cart) {
    throw new Error("Carrinho ativo não encontrado.");
  }

  const cartItem = await cartItemRepository.findOne({
    where: {
      id: cartItemId,
      cart: {
        id: cart.id,
      },
    },
  });

  if (!cartItem) {
    throw new Error("Item não encontrado no carrinho.");
  }

  await cartItemRepository.remove(cartItem);

  const remainingItems = await cartItemRepository.count({
    where: {
      cart: {
        id: cart.id,
      },
    },
  });

  if (remainingItems === 0) {
    cart.status = "finalizado";
    await cartRepository.save(cart);
  }

  return {
    message: "Item removido do carrinho com sucesso.",
  };
};

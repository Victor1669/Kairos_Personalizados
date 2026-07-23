import AppDataSource from "../config/dbconnect.js";
import CartItem from "../model/CartItem.js";
import Cart from "../model/Cart.js";

export const updateCartItemQuantityService = async (
  userId,
  cartItemId,
  quantity,
) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const cartItemRepository = AppDataSource.getRepository(CartItem);

  if (quantity < 0) {
    throw new Error("A quantidade não pode ser negativa");
  }

  const cart = await cartRepository.findOne({
    where: {
      user: {
        id: userId,
      },
    },
  });

  if (!cart) {
    throw new Error("Carrinho não encontrado");
  }

  const cartItem = await cartItemRepository.findOne({
    where: {
      id: cartItemId,
      cart: {
        id: cart.id,
      },
    },
    relations: {
      product: true,
    },
  });

  if (!cartItem) {
    throw new Error("Produto não encontrado no seu carrinho");
  }

  if (quantity === 0) {
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
      message: "Produto removido do carrinho.",
    };
  }

  cartItem.quantity = quantity;

  await cartItemRepository.save(cartItem);

  return {
    message: "Quantidade atualizada com sucesso.",
    cartItem,
  };
};

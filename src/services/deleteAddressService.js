import Endereco from "../model/Endereco.js";
import AppDataSource from "../config/dbconnect.js";

export const deleteAddressService = async (user, addressId) => {
  const addressRepository = AppDataSource.getRepository(Endereco);

  const address = await addressRepository.findOne({
    where: {
      id: addressId,
    },
    relations: {
      user: true,
    },
  });

  if (!address) {
    throw new Error("Endereço inexistente.");
  }

  if (address.user.id !== user.id) {
    throw new Error("Você não tem permissão para deletar este endereço.");
  }

  await addressRepository.remove(address);

  return {
    message: "Endereço deletado com sucesso.",
  };
};

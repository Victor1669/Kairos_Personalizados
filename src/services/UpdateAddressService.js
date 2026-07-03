import Endereco from "../model/Endereco.js";
import AppDataSource from "../config/dbconnect.js";

export const updateAddressService = async (userId, data) => {
  const addressRepository = AppDataSource.getRepository(Endereco);
  const address = await addressRepository.findOne({
    where: {
      user: {
        id: userId,
      },
    },
    relations: {
      user: true,
    },
  });
  if (!address) {
    throw new Error("Endereço não encontrado.");
  }

  if (data.cep && data.cep !== address.cep) {
    const response = await fetch(`https://viacep.com.br/ws/${data.cep}/json/`);

    if (!response.ok) {
      throw new Error("Erro ao consultar o ViaCEP.");
    }

    const viaCep = await response.json();

    if (viaCep.erro) {
      throw new Error("CEP inválido.");
    }

    address.cep = data.cep;
    address.logradouro = viaCep.logradouro;
    address.bairro = viaCep.bairro;
    address.cidade = viaCep.localidade;
    address.estado = viaCep.uf;
  }

  address.numero = data.numero ?? address.numero;
  address.complemento = data.complemento ?? address.complemento;

  await addressRepository.save(address);

  return address;
};

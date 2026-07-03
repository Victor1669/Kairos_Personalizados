import AppDataSource from "../config/dbconnect.js";
import Endereco from "../model/Endereco.js";
import User from "../model/User.js";

export const addressRegisterService = async (data) => {
  const enderecoRepository = AppDataSource.getRepository(Endereco);
  const userRepository = AppDataSource.getRepository(User);

  const { cep, numero, complemento, userId } = data;

  if (!cep || !numero) {
    throw new Error("ALL_FIELDS_MUST_BE_FILLED");
  }

  const userExists = await userRepository.findOne({
    where: { id: userId },
  });

  if (!userExists) {
    throw new Error("USER_NOT_FOUND");
  }

  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) {
    throw new Error("INVALID_CEP");
  }

  const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

  if (!response.ok) {
    throw new Error("VIACEP_ERROR");
  }

  const endereco = await response.json();

  if (endereco.erro) {
    throw new Error("CEP_NOT_FOUND");
  }

  const novoEndereco = enderecoRepository.create({
    rua: endereco.logradouro,
    bairro: endereco.bairro,
    cidade: endereco.localidade,
    estado: endereco.uf,
    cep: cepLimpo,
    numero,
    complemento,
    user: {
      id: userId,
    },
  });

  await enderecoRepository.save(novoEndereco);

  return novoEndereco;
};

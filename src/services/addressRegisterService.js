import AppDataSource from "../config/dbconnect.js";
import Endereco from "../model/Endereco.js";
import User from "../model/User.js";

export const addressRegisterService = async (data) => {
  const enderecoRepository = AppDataSource.getRepository(Endereco);
  const userRepository = AppDataSource.getRepository(User);

  const { cep, numero, complemento, userId } = data;

  if (!cep || !numero) {
    throw new Error("CEP e número são obrigatórios.");
  }

  const userExists = await userRepository.findOne({
    where: { id: userId },
  });

  if (!userExists) {
    throw new Error("Usuário não encontrado.");
  }

  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) {
    throw new Error("CEP inválido.");
  }

  const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

  if (!response.ok) {
    throw new Error("Erro ao consultar o CEP.");
  }

  const endereco = await response.json();

  if (endereco.erro) {
    throw new Error("CEP não encontrado.");
  }

  const addressAlreadyExists = await enderecoRepository.findOne({
    where: {
      rua: endereco.logradouro,
      numero,
      user: {
        id: userId,
      },
    },
  });

  if (addressAlreadyExists) {
    throw new Error("Este endereço já está cadastrado.");
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

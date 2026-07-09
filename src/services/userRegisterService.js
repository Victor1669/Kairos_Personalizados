import AppDataSource from "../config/dbconnect.js";
import User from "../model/User.js";
import bcrypt from "bcrypt";

export const registerService = async (data) => {
  const userRepository = AppDataSource.getRepository(User);

  const { name, email, password, cpf, phone } = data;

  if (!name || !email || !password || !cpf || !phone) {
    throw new Error("Todos os campos devem ser preenchidos.");
  }

  const emailExists = await userRepository.findOne({
    where: { email },
  });

  if (emailExists) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  const cpfExists = await userRepository.findOne({
    where: { cpf },
  });

  if (cpfExists) {
    throw new Error("Este CPF já está cadastrado.");
  }

  const phoneExists = await userRepository.findOne({
    where: { phone },
  });

  if (phoneExists) {
    throw new Error("Este telefone já está cadastrado.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userRepository.create({
    name,
    email,
    password: hashedPassword,
    cpf,
    phone,
  });

  await userRepository.save(newUser);

  return {
    message: "Usuário cadastrado com sucesso.",
  };
};

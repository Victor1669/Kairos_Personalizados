import AppDataSource from "../config/dbconnect.js";
import { sendWelcomeEmailService } from "../services/sendWelcomeEmailService.js";
import User from "../model/User.js";
import bcrypt from "bcrypt";

export const registerService = async (data) => {
  const userRepository = AppDataSource.getRepository(User);

  const { name, email, password, cpf, phone } = data;

  if (!name || !email || !password || !cpf || !phone) {
    throw new Error("Todos os campos devem ser preenchidos.");
  }

  const existingUser = await userRepository.findOne({
    where: [{ email }, { cpf }, { phone }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error("Este e-mail já está cadastrado.");
    }

    if (existingUser.cpf === cpf) {
      throw new Error("Este CPF já está cadastrado.");
    }

    if (existingUser.phone === phone) {
      throw new Error("Este telefone já está cadastrado.");
    }
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

  sendWelcomeEmailService({
    email: newUser.email,
    name: newUser.name,
  }).catch((error) => {
    console.error("Erro ao enviar e-mail de boas-vindas:", error);
  });

  return {
    message: "Usuário cadastrado com sucesso.",
  };
};

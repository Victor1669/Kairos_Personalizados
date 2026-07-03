import AppDataSource from "../config/dbconnect.js";
import User from "../model/User.js";
import bcrypt from "bcrypt";

export const registerService = async (data) => {
  const userRepository = AppDataSource.getRepository(User);

  const { name, email, password, cpf, phone } = data;

  if (!name || !email || !password || !cpf || !phone) {
    throw new Error("ALL_FIELDS_REQUIRED");
  }

  const emailExists = await userRepository.findOne({
    where: { email },
  });

  if (emailExists) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const cpfExists = await userRepository.findOne({
    where: { cpf },
  });

  if (cpfExists) {
    throw new Error("CPF_ALREADY_EXISTS");
  }

  const phoneExists = await userRepository.findOne({
    where: { phone },
  });

  if (phoneExists) {
    throw new Error("PHONE_ALREADY_ENTERED");
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

  const { password: _, ...userWithoutPassword } = newUser;

  return userWithoutPassword;
};

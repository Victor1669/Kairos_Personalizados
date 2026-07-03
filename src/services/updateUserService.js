import User from "../model/User.js";
import AppDataSource from "../config/dbconnect.js";

export const updateUserService = async (userId, data) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("usuario nao encontrado!");
  }

  user.name = data.name ?? user.name;
  user.email = data.email ?? user.email;
  user.phone = data.phone ?? user.phone;

  if (data.email !== user.email) {
    const emailExists = await userRepository.findOne({
      where: { email: data.email },
    });

    if (emailExists) {
      throw new Error("Email ja esta em uso!");
    }
  }
  await userRepository.save(user);

  return user;
};

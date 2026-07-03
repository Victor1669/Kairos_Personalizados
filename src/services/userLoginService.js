import User from "../model/User.js";
import AppDataSource from "../config/dbconnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginService = async (data) => {
  const userRepository = AppDataSource.getRepository(User);

  const { email, password } = data;

  if (!email || !password) {
    throw new Error("ALL_FIELDS_MUST_BE_FILLED");
  }

  const user = await userRepository.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("EMAIL_DOES_NOT_EXISTS");
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    throw new Error("INCORRECT_PASSWORD");
  }
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

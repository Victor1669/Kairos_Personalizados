import User from "../model/User.js";
import RefreshToken from "../model/RefreshToken.js";
import AppDataSource from "../config/dbconnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const loginService = async (data) => {
  const userRepository = AppDataSource.getRepository(User);
  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Todos os campos devem ser preenchidos.");
  }

  const user = await userRepository.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    throw new Error("E-mail ou senha inválidos.");
  }

  // Access Token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  // Refresh Token
  const refreshTokenValue = crypto.randomBytes(64).toString("hex");

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  const refreshToken = refreshTokenRepository.create({
    token: refreshTokenValue,
    expires_at: expiresAt,
    revoked: false,
    user,
  });

  await refreshTokenRepository.save(refreshToken);

  return {
    token,
    refreshToken: refreshTokenValue,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

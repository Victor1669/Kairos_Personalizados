import AppDataSource from "../config/dbconnect.js";
import RefreshToken from "../model/RefreshToken.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh Token ausente!",
    });
  }

  try {
    const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

    const tokenEntry = await refreshTokenRepository.findOne({
      where: {
        token: refreshToken,
      },
      relations: {
        user: true,
      },
    });

    if (!tokenEntry) {
      return res.status(403).json({
        message: "Refresh Token inválido!",
      });
    }

    if (tokenEntry.revoked) {
      return res.status(403).json({
        message: "Refresh Token revogado!",
      });
    }

    if (new Date(tokenEntry.expires_at) < new Date()) {
      return res.status(403).json({
        message: "Refresh Token expirado!",
      });
    }

    // Novo Access Token
    const accessToken = jwt.sign(
      {
        id: tokenEntry.user.id,
        email: tokenEntry.user.email,
        role: tokenEntry.user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    // Novo Refresh Token
    const newRefreshToken = crypto.randomBytes(64).toString("hex");

    tokenEntry.token = newRefreshToken;

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    tokenEntry.expires_at = expiresAt;

    await refreshTokenRepository.save(tokenEntry);

    return res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    return res.status(403).json({
      message: "Refresh Token inválido!",
    });
  }
};

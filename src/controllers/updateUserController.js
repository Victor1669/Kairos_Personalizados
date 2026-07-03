import { updateUserService } from "../services/updateUserService.js";

export const updateUserController = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    const updatedUser = await updateUserService(userId, data);

    return res.status(200).json({
      message: "Usuário atualizado com sucesso!",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

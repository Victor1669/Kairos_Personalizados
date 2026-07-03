import { addressRegisterService } from "../services/addressRegisterService.js";
export const addressRegisterController = async (req, res) => {
  try {
    const { cep, numero, complemento } = req.body;

    const userId = req.user.id;

    const result = await addressRegisterService({
      cep,
      numero,
      complemento,
      userId,
    });

    return res.status(201).json({
      message: "ADDRESS_REGISTERED_SUCCESSFULLY",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

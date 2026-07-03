import { updateAddressService } from "../services/updateAddressService.js";

export const updateAddressController = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    const address = await updateAddressService(userId, data);

    return res.status(200).json({
      message: "Endereco atualizado com sucesso",
      address,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

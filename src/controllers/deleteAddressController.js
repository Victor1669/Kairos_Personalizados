import { deleteAddressService } from "../services/deleteAddressService.js";

export const deleteAddressController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteAddressService(req.user, id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

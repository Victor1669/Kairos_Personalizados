import { uploadImageService } from "../services/upload/uploadImage.service.js";
import createProductService from "../services/uploadProductImageService.js";

export const createProductController = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Imagem obrigatória",
      });
    }

    const upload = await uploadImageService(file.buffer);

    const product = await createProductService({
      ...req.body,
      imageUrl: upload.secure_url,
      imagePublicId: upload.public_id,
    });

    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

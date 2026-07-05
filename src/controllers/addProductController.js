import { addProductService } from "../services/addProductService.js";
import { uploadImageService } from "../services/uploadProductImageService.js";

export const addProductController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const upload = await uploadImageService(req.file.buffer);

    const product = await addProductService({
      ...req.body,
      imageUrl: upload.secure_url,
      publicId: upload.public_id,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.log("ERRO REAL:", err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

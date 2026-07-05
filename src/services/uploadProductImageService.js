import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

export const uploadImageService = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      },
    );

    Readable.from(buffer).pipe(stream);
  });
};

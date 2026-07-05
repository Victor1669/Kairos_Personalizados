import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

const uploadImage = (fileBuffer) => {
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

    Readable.from(fileBuffer).pipe(stream);
  });
};

export default uploadImage;

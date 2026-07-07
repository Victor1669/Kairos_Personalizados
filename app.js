import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AppDataSource from "./src/config/dbconnect.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import addressRoutes from "./src/routes/addressRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Rotas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/addresses", addressRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado com sucesso!");

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco:", error);
    process.exit(1);
  });

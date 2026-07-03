import express from "express";
import dotenv from "dotenv";

import AppDataSource from "./src/config/dbconnect.js";

import registerRoutes from "./src/routes/registerRoutes.js";
import loginRoutes from "./src/routes/loginRoutes.js";
import addressRoutes from "./src/routes/addressRoutes.js";
import ProductRoutes from "./src/routes/ProductRoutes.js";
import UpdateUserRoutes from "./src/routes/updateUserRoutes.js";
import UpdateAddressRoutes from "./src/routes/updateAddressRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

// Rotas

app.use("/auth", registerRoutes);
app.use("/auth", loginRoutes);
app.use("/addresses", addressRoutes);
app.use("/products", ProductRoutes);
app.use("/users", UpdateUserRoutes);
app.use("/addresses", UpdateAddressRoutes);

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

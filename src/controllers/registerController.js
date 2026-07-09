import { registerService } from "../services/userRegisterService.js";
import { isValidCPF } from "../utils/isValidCPF.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, cpf } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // valida campos obrigatórios
    if (!name || !email || !password || !cpf || !phone) {
      return res.status(400).json({
        message: "Nome, e-mail, senha, CPF e telefone são obrigatórios.",
      });
    }

    // valida email
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "E-mail inválido.",
      });
    }

    // valida senha
    if (password.length < 8) {
      return res.status(400).json({
        message: "A senha deve ter no mínimo 8 caracteres.",
      });
    }

    // valida telefone
    if (phone.length < 9) {
      return res.status(400).json({
        message: "Telefone inválido.",
      });
    }

    // valida CPF
    if (!isValidCPF(cpf)) {
      return res.status(400).json({
        message: "CPF inválido.",
      });
    }

    // chama service
    const user = await registerService({
      name,
      email,
      password,
      phone,
      cpf,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(400).json({
      message: error.message,
    });
  }
};

import { loginService } from "../services/userLoginService.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginService({ email, password });

    return res.status(200).json({
      message: "LOGIN_SUCESS",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

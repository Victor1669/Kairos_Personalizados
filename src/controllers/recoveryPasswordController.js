import {
  sendRecoveryCode,
  resetPasswordWithCode,
} from "../services/recoveryPasswordService.js";

export async function sendRecoveryCodeController(req, res) {
  try {
    const { email } = req.body;

    const result = await sendRecoveryCode(email);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function resetPasswordController(req, res) {
  try {
    const { code, newPassword } = req.body;

    const result = await resetPasswordWithCode(code, newPassword);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

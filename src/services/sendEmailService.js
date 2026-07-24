import transporter from "../config/mail.js";

export const sendEmailService = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Kairos Personalizados" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("E-mail enviado com sucesso:", info.messageId);

    return info;
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);

    throw error;
  }
};

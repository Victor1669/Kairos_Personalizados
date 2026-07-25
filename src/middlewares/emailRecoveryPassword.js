import fs from "fs";
import path from "path";
import transporter from "../config/mail.js";

export default async function emailRecoveryPassword({ user, code }) {
  if (!user || !user.email || !user.name) return;

  const templatePath = path.join(
    process.cwd(),
    "email_templates",
    "recovery.html",
  );

  let html = fs.readFileSync(templatePath, "utf-8");

  html = html.replace("{{name}}", user.name);
  html = html.replace("{{recovery_code}}", code);

  await transporter.sendMail({
    from: `"Kairos Grafica" <${process.env.MAIL_USER}>`,
    to: user.email,
    subject: "Recuperação de senha",
    html,
  });
}

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { sendEmailService } from "./sendEmailService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendWelcomeEmailService = async ({ email, name }) => {
  const templatePath = path.join(
    __dirname,
    "..",
    "..",
    "email_templates",
    "welcome.html",
  );

  let html = await fs.readFile(templatePath, "utf-8");

  html = html.replace("{{name}}", name);

  await sendEmailService({
    to: email,
    subject: "Bem-vindo à Kairos Personalizados!",
    html,
  });
};

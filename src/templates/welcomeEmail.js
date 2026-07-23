export const welcomeEmail = (name) => {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          font-family: Arial, Helvetica, sans-serif;
        }

        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
        }

        .header {
          background-color: #111111;
          padding: 30px;
          text-align: center;
        }

        .logo {
          color: #d4af37;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .content {
          padding: 40px 30px;
          color: #333333;
        }

        h1 {
          color: #111111;
        }

        .button {
          display: inline-block;
          margin-top: 20px;
          padding: 14px 28px;
          background-color: #d4af37;
          color: #111111;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
        }

        .footer {
          padding: 20px;
          text-align: center;
          background-color: #111111;
          color: #aaaaaa;
          font-size: 12px;
        }
      </style>
    </head>

    <body>
      <div class="container">

        <div class="header">
          <div class="logo">KAIROS</div>
        </div>

        <div class="content">
          <h1>Olá, ${name}! 👋</h1>

          <p>
            Seja muito bem-vindo à <strong>Kairos Personalizados</strong>.
          </p>

          <p>
            Sua conta foi criada com sucesso e agora você pode encontrar
            produtos personalizados feitos especialmente para você.
          </p>

          <p>
            Obrigado por fazer parte da Kairos.
          </p>

          <a href="#" class="button">
            Conhecer a Kairos
          </a>
        </div>

        <div class="footer">
          © ${new Date().getFullYear()} Kairos Personalizados.
          Todos os direitos reservados.
        </div>

      </div>
    </body>
    </html>
  `;
};

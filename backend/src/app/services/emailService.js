import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // Gmail utilise STARTTLS
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendResetEmail(to, link) {
  await transporter.sendMail({
    from: `"Cave à Vin" <${process.env.MAIL_USER}>`,
    to,
    subject: "Réinitialisation de votre mot de passe",
    html: `
      <h2>Réinitialisation du mot de passe</h2>
      <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
      <p>Cliquez sur le lien ci-dessous :</p>
      <a href="${link}" target="_blank">${link}</a>
      <p>Ce lien expire dans 10 minutes.</p>
    `,
  });
}

import User from "../models/User.js";
import { sendResetEmail } from "../services/emailService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Op } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL;

const authController = {

  // LOGIN
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Couple identifiant/mot de passe incorrect" });
      }

      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) {
        return res.status(401).json({ message: "Couple identifiant/mot de passe incorrect" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET,
        { expiresIn: "4h" }
      );

      return res.status(200).json({
        message: "Connexion réussie",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.created_at
        }
      });

    } catch (error) {
      console.error("Erreur login :", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // FORGOT PASSWORD
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      // Toujours répondre OK pour éviter de leak les emails
      if (!user) {
        return res.json({ message: "Email envoyé" });
      }

      const resetToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

      user.resetToken = hashedToken;
      user.resetTokenExpire = Date.now() + 1000 * 60 * 10; // 10 minutes
      await user.save();

      const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;
      console.log("Lien de reset :", resetLink);

      await sendResetEmail(email, resetLink);

      return res.json({ message: "Email envoyé" });

    } catch (error) {
      console.error("Erreur forgotPassword :", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // RESET PASSWORD
  resetPassword: async (req, res) => {
    try {
      const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

      const user = await User.findOne({
        where: {
          resetToken: hashedToken,
          resetTokenExpire: { [Op.gt]: Date.now() }
        }
      });

      if (!user) {
        return res.status(400).json({ message: "Token invalide ou expiré" });
      }

      const { password } = req.body;

      user.password = await bcrypt.hash(password, 10);
      user.resetToken = null;
      user.resetTokenExpire = null;

      await user.save();

      return res.json({ message: "Mot de passe mis à jour" });

    } catch (error) {
      console.error("Erreur resetPassword :", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },

};

export default authController;


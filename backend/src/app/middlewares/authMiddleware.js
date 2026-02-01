import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * Middleware pour authentifier les utilisateurs via JWT
 * Vérifie la présence et la validité du token dans l'en-tête Authorization
 * Injecte l'utilisateur dans la requête pour les routes suivantes
 */

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie si le header est présent et bien formé
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant ou malformé" });
  }

  //On extrait le vrai token en retirant "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    // Vérifie et décode le token avec la clé secrète
    const decoded = jwt.verify(token, process.env.SECRET);

    // Injecte l'utilisateur dans la requête pour les routes suivantes
    req.user = { id: decoded.id };
    next(); // Passe à la suite (ex: createRecipe)
  } catch (err) {
    console.error("Erreur JWT :", err);
    return res.status(403).json({ error: "Token invalide ou expiré" });
  }
};

export default authenticateUser;

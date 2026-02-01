import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const userController = {

    // GET /api/users/me
    getMe: async (req, res) => {
  try {
    const userId = req.user.id; // récupéré via authenticateUser
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    });
    

  } catch (error) {
    console.error("Erreur getMe :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
},


    // GET /api/users
    getAllUser: async (req, res) => {
        try {
            const result = await User.findAll();
            return res.status(200).json(result);
        } catch (error) {
            console.error("Erreur getAllUser :", error);
            return res.status(500).json({ error: "Erreur interne du serveur." });
        }
    },

    // GET /api/users/email/:email
    getUserByEmail: async (req, res) => {
        try {
            const email = req.params.email;
            const result = await User.findOne({ where: { email } });

            if (!result) {
                return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet email" });
            }

            return res.status(200).json(result);
        } catch (error) {
            console.error("Erreur getUserByEmail :", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }
    },

    // GET /api/users/id/:id
    getUserById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await User.findByPk(id);

            if (!result) {
                return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet ID" });
            }

            return res.status(200).json(result);
        } catch (error) {
            console.error("Erreur getUserById :", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }
    },

    // POST /api/users (signup)
    createNewUser: async (req, res) => {
        try {
            const { email, password, username } = req.body;

            // Vérifier si email existe déjà
            const userByEmail = await User.findOne({ where: { email } });
            if (userByEmail) {
                return res.status(409).json({ message: "Email déjà utilisé" });
            }

            // Vérification du mot de passe
            const options = { minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };
            if (!validator.isStrongPassword(password, options)) {
                return res.status(409).json({
                    message: "Le mot de passe doit comporter au moins 12 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole"
                });
            }

            // Hash
            const hash = await bcrypt.hash(password, 10);

            // Création
            await User.create({
                username,
                email,
                password: hash,
                created_at: new Date()
            });

            return res.status(201).json("Nouvel utilisateur enregistré avec succès");
        } catch (error) {
            console.error("Erreur createNewUser :", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }
    },

    // POST /login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Vérifier si l'utilisateur existe
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: "Identifiants incorrects" });
            }

            // Vérifier le mot de passe
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return res.status(401).json({ message: "Identifiants incorrects" });
            }

            // Générer un token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            return res.status(200).json({
                message: "Connexion réussie",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });

        } catch (error) {
            console.error("Erreur login :", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }
    },

    // PATCH /api/users/:id
    updateUser: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "Utilisateur introuvable" });
            }

            // Si mot de passe fourni → hash
            if (req.body.password) {
                const options = { minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };
                if (!validator.isStrongPassword(req.body.password, options)) {
                    return res.status(409).json({
                        message: "Mot de passe trop faible"
                    });
                }

                req.body.password = await bcrypt.hash(req.body.password, 10);
            }

            await user.update(req.body);

            return res.status(200).json("Profil mis à jour");
        } catch (error) {
            console.error("Erreur updateUser :", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }
    },

    // DELETE /api/users/:id
    delete: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "Utilisateur introuvable" });
            }

            await user.destroy();

            return res.status(200).json("Utilisateur supprimé");
        } catch (error) {
            console.error("Erreur deleteUser :", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }
    }
};

export default userController;

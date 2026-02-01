import express from "express";
import authController from "./controllers/authController.js";
import userController from "./controllers/userController.js";
import bottleController from "./controllers/bottleController.js";
import authenticateUser from "./middlewares/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

    //USERS
// Créer un utilisateur
router.post("/users", userController.createNewUser);
// Récupérer l'utilisateur authentifié
router.get("/users/me", authenticateUser, userController.getMe);
// Récupérer tous les utilisateurs
router.get("/users", authenticateUser, userController.getAllUser);
// Récupérer un utilisateur par ID
router.get("/users/id/:id", authenticateUser, userController.getUserById);
// Récupérer un utilisateur par email
router.get("/users/email/:email", authenticateUser, userController.getUserByEmail);
// Modifier un utilisateur
router.patch("/users/:id", authenticateUser, userController.updateUser);
// Supprimer un utilisateur
router.delete("/users/:id", authenticateUser, userController.delete);


    //BOTTLES
// Récupérer toutes les bouteilles
router.get("/bottles", authenticateUser, bottleController.getAll);
// Récupérer une bouteille par ID
router.get("/bottles/:id", bottleController.getById);
// Créer une nouvelle bouteille
router.post("/bottles", authenticateUser, bottleController.create);
// Mettre à jour une bouteille
router.patch("/bottles/:id", authenticateUser, bottleController.update);
// Supprimer une bouteille
router.delete("/bottles/:id", authenticateUser, bottleController.delete);


export default router;

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import sequelize from "./src/app/db/database.js";
import router from "./src/app/router.js";

dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: [
    "http://localhost:1234",
    "https://cave_a_vin-frontend.onrender.com"
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// JSON parser
app.use(express.json());

// Routes principales
app.use("/api", router);

// Port
const port = process.env.PORT || 3000;

// Connexion + lancement serveur
sequelize.sync()
  .then(() => {
    console.log("Base synchronisée avec Sequelize");
    app.listen(port, () => {
      console.log(`Serveur lancé sur http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Erreur de synchronisation Sequelize :", err);
  });

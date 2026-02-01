import Bottle from "../models/Bottle.js";

const bottleController = {
    // GET /bottles → liste toutes les bouteilles
  async getAll(req, res) {
    try {
      const userId = req.user.id; // récupéré depuis le token

      const bottles = await Bottle.findAll({
        where: { userId }
      });

      res.status(200).json(bottles);
    } catch (error) {
      console.error("Erreur getAll:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

    // GET /bottles/:id → récupère une bouteille par son ID
  async getById(req, res) {
    try {
      const bottle = await Bottle.findByPk(req.params.id);
      if (!bottle) {
        return res.status(404).json({ message: "Bouteille non trouvée" });
      }
      res.status(200).json(bottle);
    } catch (error) {
      console.error("Erreur getById:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

    // POST /bottles → crée une nouvelle bouteille
  async create(req, res) {
    try {
      const userId = req.user.id;

      const newBottle = await Bottle.create({
        ...req.body,
        userId
      });

      res.status(201).json(newBottle);
    } catch (error) {
      console.error("Erreur create:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

    // PATCH /bottles/:id → met à jour une bouteille existante
  async update(req, res) {
    try {
      const bottle = await Bottle.findByPk(req.params.id);

      if (!bottle) {
        return res.status(404).json({ message: "Bouteille non trouvée" });
      }

      if (bottle.userId !== req.user.id) {
        return res.status(403).json({ message: "Accès interdit" });
      }

      await bottle.update(req.body);
      res.status(200).json(bottle);
    } catch (error) {
      console.error("Erreur update:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

    // DELETE /bottles/:id → supprime une bouteille
  async delete(req, res) {
    try {
      const bottle = await Bottle.findByPk(req.params.id);

      if (!bottle) {
        return res.status(404).json({ message: "Bouteille non trouvée" });
      }

      if (bottle.userId !== req.user.id) {
        return res.status(403).json({ message: "Accès interdit" });
      }

      await bottle.destroy();
      res.status(200).json({ message: "Bouteille supprimée avec succès" });
    } catch (error) {
      console.error("Erreur delete:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
};

export default bottleController;

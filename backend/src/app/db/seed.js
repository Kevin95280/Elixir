import sequelize from "./database.js";
import Bottle from "../models/Bottle.js";
import User from "../models/User.js";

const seed = async () => {
  await sequelize.sync({ force: true }); // recrée les tables

    // Crée un utilisateur de test
  const user = await User.create({
    username: "user1",
    email: "user1@ymail.com",
    password: "hashedpassword"
  });

  await Bottle.bulkCreate([
    {
      name: "Château Jaron Cuvée Puy Berton Bordeaux",
      year: 2019,
      type: "Rouge",
      owner: "",
      link: "https://www.vivino.com/FR/fr/chateau-jaron-cuvee-puy-berton-bordeaux-bordeaux-red-wine-v-rt6qn/w/11681254?year=2019",
      img: "https://www.winewarehouse.my/wp-content/uploads/2025/02/ChateauJaron.png",
      alt: "Château Jaron Cuvée Puy Berton Bordeaux",
      userId: user.id
    },
    {
      name: "Domaines Roland Dumas Château Lalibarde Côtes de Bourg",
      year: 2011,
      type: "Rouge",
      owner: "",
      link: "https://www.vivino.com/FR/fr/domaines-roland-dumas-chateau-lalibarde-cotes-de-bourg/w/2631840?year=2011",
      img: "https://images.vivino.com/thumbs/ZgwrMw5RRamp1xbIHbvnqg_pb_x960.png",
      alt: "Domaines Roland Dumas Château Lalibarde Côtes de Bourg",
      userId: user.id
    },
    {
      name: "Domenico Pennacchi Terre di Capitani Montefalco Riserva Rosso",
      year: 2011,
      type: "Rouge",
      owner: "",
      link: "https://www.vivino.com/FR/fr/domenico-pennacchi-pennacchi-terre-di-capitani-riseva-montefalco-rosso/w/1246780?year=2011",
      img: "https://images.vivino.com/thumbs/xhoO0aPpShGx5ewPf_Vy-Q_pb_x600.png",
      alt: "Domenico Pennacchi Terre di Capitani Montefalco Riserva Rosso",
      userId: user.id
    },
    {
      name: "Caldora Montepulciano d'Abruzzo",
      year: 2015,
      type: "Rouge",
      owner: "",
      link: "https://www.vivino.com/FR/fr/caldora-montepulciano-d-abruzzo/w/11852?year=2015",
      img: "https://images.vivino.com/thumbs/bdmNHkHJSomCxv85-f6Dpg_pb_x960.png",
      alt: "Caldora Montepulciano d'Abruzzo",
      userId: user.id
    },
    {
      name: "Alto Pina Reserva Branco",
      year: 2022,
      type: "Blanc",
      owner: "",
      link: "https://www.vivino.com/FR/fr/alto-pina-reserva-branco/w/5742216?year=2022",
      img: "https://images.vivino.com/thumbs/14vNkBC4SaKI_O14i43yOQ_pb_x960.png",
      alt: "Alto Pina Reserva Branco",
      userId: user.id
    }
  ]);

  console.log("Seeding terminé");
};

seed();

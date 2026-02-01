import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Bottle = sequelize.define("Bottle", {
  name: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
  type: { type: DataTypes.STRING },
  owner: { type: DataTypes.STRING },
  link: { type: DataTypes.TEXT },
  img: { type: DataTypes.TEXT },
  alt: { type: DataTypes.TEXT },
  userId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: "bottle",
  timestamps: true
});

export default Bottle;
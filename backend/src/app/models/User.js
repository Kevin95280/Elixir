import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [1, 32],
        msg: "Le nom d'utilisateur doit contenir entre 1 et 32 caractères",
      },
    },
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Le format d'email n'est pas valide",
      },
    },
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  resetToken: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  resetTokenExpire: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "user",
  timestamps: true,
});

export default User;

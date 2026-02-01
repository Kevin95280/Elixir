import User from "./User.js";
import Bottle from "./Bottle.js";

// Relations
User.hasMany(Bottle, { foreignKey: "userId" });
Bottle.belongsTo(User, { foreignKey: "userId" });

export { User, Bottle };

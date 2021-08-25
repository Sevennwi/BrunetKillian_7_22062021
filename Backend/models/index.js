require("dotenv").config();
const Sequelize = require("sequelize");
const { getAllGifs } = require("../controllers/gif.js");
const Reaction = require("./Reaction.js");
const { DB_Name, DB_User, DB_Password } = process.env;

const sequelize = new Sequelize(DB_Name, DB_User, DB_Password, {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connecté à la base de données MySQL!");
} catch (error) {
  console.error("Impossible de se connecter, erreur suivante :", error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.js")(sequelize, Sequelize);
db.Gif = require("./Gif.js")(sequelize, Sequelize);
db.Reaction = require("./Reaction.js")(sequelize, Sequelize);
db.Commentaire = require("./Commentaire.js")(sequelize, Sequelize);

db.User.hasMany(db.Gif);
db.Gif.belongsTo(db.User);

db.User.hasMany(db.Reaction);
db.Reaction.belongsTo(db.User);

db.User.hasMany(db.Commentaire);
db.Commentaire.belongsTo(db.User);

db.Gif.hasMany(db.Reaction);
db.Reaction.belongsTo(db.Gif);

db.Gif.hasMany(db.Commentaire);
db.Commentaire.belongsTo(db.Gif);

/*db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});*/

module.exports = db;

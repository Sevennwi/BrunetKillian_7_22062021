
const Sequelize = require("sequelize");
const sequelize = new Sequelize('groupomania', 'Admin', 'Azerty12', {
  host: 'localhost',
  dialect:'mysql'
});

try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.js")(sequelize, Sequelize);
db.Gif = require("./Gif.js")(sequelize, Sequelize);

/*db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});*/

module.exports = db;
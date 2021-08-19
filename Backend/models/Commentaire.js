module.exports = (sequelize, Sequelize) => {
    const Commentaire = sequelize.define("commentaire", {
    commentaire: {
      type: Sequelize.STRING
    }
    });
  
    return Commentaire;
  };
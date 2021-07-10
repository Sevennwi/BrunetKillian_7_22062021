
module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("Like", {
      id: {
        type: Sequelize.INTEGER
    },
      userId: {
        type: Sequelize.INTEGER
      },
      GifId: {
        type: Sequelize.INTEGER
        }
    });
  
    return Like;
  };
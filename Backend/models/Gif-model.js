
module.exports = (sequelize, Sequelize) => {
    const Gif = sequelize.define("Gif", {
      title: {
        type: Sequelize.STRING
    },
      description: {
        type: Sequelize.STRING
      },
      ImageUrl: {
        type: Sequelize.STRING
        },
      Like: {
            type: Sequelize.NUMBER
        }
    });
  
    return Gif;
  };
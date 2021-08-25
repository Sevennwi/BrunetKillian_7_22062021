module.exports = (sequelize, Sequelize) => {
  const Gif = sequelize.define("gif", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
  });

  return Gif;
};

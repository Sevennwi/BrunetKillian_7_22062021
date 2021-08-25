module.exports = (sequelize, Sequelize) => {
  const Reaction = sequelize.define("reaction", {
    type: {
      type: Sequelize.STRING,
    },
  });

  return Reaction;
};

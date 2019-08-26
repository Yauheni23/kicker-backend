const TOURNAMENT = 'tournament';

module.exports = (sequelize, Sequelize) => {
  return sequelize.define(TOURNAMENT, {
    name: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });
};

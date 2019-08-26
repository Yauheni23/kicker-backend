const GAME_USER = 'gameUser';

module.exports = (sequelize, Sequelize) => {
  return sequelize.define(GAME_USER, {
    teamId: {
      type: Sequelize.INTEGER,
    },
    gameId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    goals: {
      type: Sequelize.INTEGER,
    }
  });
};

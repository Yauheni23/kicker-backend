const TEAM_GAME = 'teamGames';

module.exports = (sequelize, Sequelize) => {
  return sequelize.define(TEAM_GAME, {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    teamId: {
      type: Sequelize.INTEGER,
    },
    gameId: {
      type: Sequelize.INTEGER,
    },
    goals: {
      type: Sequelize.INTEGER,
    }
  });
};

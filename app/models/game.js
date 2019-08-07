const GAME = 'game';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(GAME, {
        date: {
            type: Sequelize.DATE
        },
        goalsTeam1: {
            type: Sequelize.INTEGER
        },
        goalsTeam2: {
            type: Sequelize.INTEGER
        }
    });
};

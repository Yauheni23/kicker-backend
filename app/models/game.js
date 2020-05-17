const GAME = 'game';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(GAME, {
        date: {
            type: Sequelize.DATE,
        },
        confirmed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        winTeamId: {
            type: Sequelize.INTEGER,
        },
        winPlayer1Id: {
            type: Sequelize.INTEGER,
        },
        winPlayer2Id: {
            type: Sequelize.INTEGER,
        }
    });
};

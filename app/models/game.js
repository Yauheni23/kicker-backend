const GAME = 'game';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(GAME, {
        date: {
            type: Sequelize.DATE
        },
        tournamentId: {
            type: Sequelize.INTEGER,
        },
        completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
};

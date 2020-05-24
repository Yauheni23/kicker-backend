const CALL = 'calls';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(CALL, {
        date: {
            type: Sequelize.DATE,
        },
        createdTeamId: {
            type: Sequelize.INTEGER,
        },
        opponentTeamId: {
            type: Sequelize.INTEGER,
        },
        createdTeamConfirmed: {
            type: Sequelize.INTEGER,
        },
        opponentTeamConfirmed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        }
    });
};

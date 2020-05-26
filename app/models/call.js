const CALL = 'calls';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(CALL, {
        date: {
            type: Sequelize.DATE,
        },
        creatorConfirmed: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        opponentConfirmed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
};

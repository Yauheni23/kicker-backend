const TEAM_PLAYER = 'teamPlayer';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(TEAM_PLAYER, {
        teamId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        }
    });
};

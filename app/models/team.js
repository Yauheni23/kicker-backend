const TEAM = 'team';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(TEAM, {
        name: {
            type: Sequelize.STRING,
            validate: {
                min: {
                    args: [2],
                    msg: 'Name is too short'
                }
            }
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false
        },
        is_tournament_team: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
};

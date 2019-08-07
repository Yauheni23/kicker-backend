const TEAM = 'team';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(TEAM, {
        name: {
            type: Sequelize.STRING,
            unique: true,
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
        }
    });
};

const USER = 'user';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(USER, {
        name: {
            type: Sequelize.STRING,
            validate: {
                min: {
                    args: [2],
                    msg: 'Name is too short'
                }
            },
            unique: true
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
};

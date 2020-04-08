const USER = 'user';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(USER, {
        mail: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            },
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            validate: {
                min: {
                    args: [2],
                    msg: 'Name is too short!'
                }
            },
            unique: true
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        confirmedKey: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
};

const USER = 'users';

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
                    msg: 'Имя пользователя слишком короткое!'
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

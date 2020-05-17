const SPACE = 'spaces';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(SPACE, {
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
    });
};

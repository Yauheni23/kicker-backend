const ADMIN = 'admin';

module.exports = (sequelize, Sequelize) => {
  return sequelize.define(ADMIN, {
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
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
};

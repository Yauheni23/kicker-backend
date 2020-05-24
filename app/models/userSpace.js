const USER_SPACE = 'userSpaces';

module.exports = (sequelize, Sequelize) => {
  return sequelize.define(USER_SPACE, {
    userId: {
      type: Sequelize.INTEGER,
    },
    spaceId: {
      type: Sequelize.INTEGER,
    },
    isConfirmedUser: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isConfirmedAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }
  });
};

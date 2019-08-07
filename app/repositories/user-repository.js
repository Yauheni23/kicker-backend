const Op = require('sequelize').Op;
const User = require('../db/db.config.js').User;

const defaultOptions = {
  include: ['teams'],
  attributes: ['id', 'name', 'scope', 'countGame']
};

class UserRepository {
  getAll(filter) {
    return User.findAll({
      ...filter,
      ...defaultOptions
    });
  }

  getById(usersId) {
    const filter = {
      where: {
        [Op.or]: [].concat(usersId)
      }
    };

    return User.findAll({
      ...filter,
      ...defaultOptions
    });
  }

  create(data) {
    return User.create(data);
  }

  update(data, options) {
    return User.update(data, options);
  }
}

module.exports = UserRepository;

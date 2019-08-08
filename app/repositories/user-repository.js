
const User = require('../db/db.config.js').User;

const defaultOptions = {
  include: ['teams'],
  attributes: ['id', 'name', 'image', 'scope', 'countGame']
};

class UserRepository {
  getAll(filter) {
    return User.findAll({
      ...filter,
      ...defaultOptions
    });
  }

  getById(id) {
    return User.findOne({
      where: {
        id: id
      },
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

const User = require('../db/db.config.js').User;

const defaultOptions = {
  include: ['teams', {
    association: 'games'
  }],
  attributes: ['id', 'name', 'image', 'mail', 'password']
};

class UserRepository {
  getOne(filter) {
    return User.findOne({
      ...filter,
      ...defaultOptions
    });
  }

  getAll(filter) {
    return User.findAll({
      ...filter,
      ...defaultOptions
    });
  }

  getById(id) {
    return User.findOne({
      where: {
        id
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

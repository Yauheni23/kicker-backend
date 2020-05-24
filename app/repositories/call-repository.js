const {Call} = require('../db/db.config.js');

const defaultOptions = {
  include: ['statuses', {
    association: 'games'
  }],
  attributes: ['id', 'name', 'image', 'mail', 'password']
};

class CallRepository {
  getAll(filter) {
    return Call.findAll({
      ...filter,
      ...defaultOptions
    });
  }

  getById(id) {
    return Call.findOne({
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
    return Call.update(data, options);
  }
}

module.exports = CallRepository;

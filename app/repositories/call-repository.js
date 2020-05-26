const {Call} = require('../db/db.config.js');

const defaultOptions = {
  include: [
    {association: 'Status', attributes: ['name']}, {
    association: 'creator'
  }, { association: 'opponent'}]
};

class CallRepository {
  getAll(filter) {
    return Call.findAll({
      ...filter,
      ...defaultOptions
    });
  }

  create(data) {
    return Call.create(data);
  }

  update(data, options) {
    return Call.update(data, options);
  }

  destroy(options) {
    return Call.destroy(options);
  }
}

module.exports = CallRepository;

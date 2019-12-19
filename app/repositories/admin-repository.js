const Admin = require('../db/db.config.js').Admin;

const defaultOptions = {
  attributes: ['id', 'name', 'password']
};

class AdminRepository {
  getOne(filter) {
    return Admin.findOne({
      ...filter,
      ...defaultOptions
    });
  }

  create(data) {
    return Admin.create(data);
  }
}

module.exports = AdminRepository;

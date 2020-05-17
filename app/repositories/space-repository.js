const Space = require('../db/db.config.js').Space;

const defaultOptions = {
  include: ['games'],
  attributes: ['id', 'name', 'image']
};

class SpaceRepository {
  getOne(filter) {
    return Space.findOne({
      ...filter,
      ...defaultOptions
    });
  }

  getAll(filter) {
    return Space.findAll({
      ...filter,
      ...defaultOptions
    });
  }

  getById(id) {
    return Space.findOne({
      where: {
        id: id
      },
      ...defaultOptions
    });
  }

  create(data) {
    return Space.create(data);
  }

  update(data, options) {
    return Space.update(data, options);
  }
}

module.exports = SpaceRepository;

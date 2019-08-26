const Tournament = require('../db/db.config.js').Tournament;

const defaultOptions = {
  include: [
    { association: 'teams', attributes: ['id', 'name', 'image'], include: {
        association: 'users', attributes: ['id', 'name', 'image']
      }},
    { association: 'games', include: [{
        association: 'teams', attributes: ['id', 'name', 'image']
      }, {
        association: 'players', attributes: ['id', 'name', 'image']
      }],
      attributes: ['id', 'date']
    }
  ],
  attributes: ['id', 'name', 'image']
};

class TournamentRepository {
  getAll(filter) {
    return Tournament.findAll({
      ...filter,
      ...defaultOptions
    });
  }

  getById(id) {
    return Tournament.findOne({
      where: {
        id: id
      },
      ...defaultOptions
    });
  }

  create(data) {
    return Tournament.create(data);
  }

  update(data, options) {
    return Tournament.update(data, options);
  }
}

module.exports = TournamentRepository;

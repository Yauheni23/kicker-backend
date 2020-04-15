const Team = require('../db/db.config.js').Team;

const defaultOptions = {
  include: [
    {association: 'users', attributes: ['id', 'name', 'image']},
    {association: 'games', attributes: ['id', 'date']},
  ],
  attributes: ['id', 'name', 'image', 'captainId'],
};

class TeamRepository {
  getAll(options = {}) {
    return Team.findAll({
      ...defaultOptions,
      ...options,
    });
  }

  getById(id) {
    return Team.findOne({
      ...defaultOptions,
      where: {
        id: id,
      },
    });
  }

  create(data) {
    return Team.create(data)
  }

  addUser(data) {
    return Team.findOne({
      where: {
        id: data.teamId
      }
    }).then(team => team.addUser(data.userId));
  }
}

module.exports = TeamRepository;

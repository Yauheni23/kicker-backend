const Team = require('../db/db.config.js').Team;

const defaultOptions = {
  include: [
    {association: 'users', attributes: ['id', 'name', 'image']},
    {association: 'games', attributes: ['id', 'date']},
  ],
  attributes: ['id', 'name', 'image'],
  where: {
    is_tournament_team: false
  }
};

class TeamRepository {
  getAll() {
    return Team.findAll(defaultOptions);
  }

  getById(id) {
    return Team.findOne({
      where: {
        id: id
      }, ...defaultOptions
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

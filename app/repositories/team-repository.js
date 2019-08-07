const Team = require('../db/db.config.js').Team;
const TeamPlayer = require('../db/db.config.js').TeamPlayer;

class TeamRepository {
  getAll() {
    return Team.findAll({
      include: [
        { association: 'users', attributes: ['id', 'name', 'image', 'scope', 'countGame'] },
        { association: 'games1', attributes: ['id', 'date', 'goalsTeam1', 'goalsTeam2'], include: ['team1', 'team2'] },
        { association: 'games2', attributes: ['id', 'date', 'goalsTeam1', 'goalsTeam2'], include: ['team1', 'team2'] },
      ],
      attributes: ['id', 'name', 'image']
    });
  }

  create(data) {
    return Team.create(data)
  }

  addUser(data) {
    return TeamPlayer.create(data);
  }
}

module.exports = TeamRepository;

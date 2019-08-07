const Game = require('../db/db.config.js').Game;

class GameRepository {
  getAll() {
    return Game.findAll({
      order: [['date', 'DESC']],
      include: ['team1', 'team2']
    });
  }

  create(data) {
    return Game.create(data)
  }
}

module.exports = GameRepository;

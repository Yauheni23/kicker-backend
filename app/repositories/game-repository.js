const Game = require('../db/db.config.js').Game;
const TeamGame = require('../db/db.config.js').TeamGame;
const GameUser = require('../db/db.config.js').GameUser;

class GameRepository {
  getAll() {
    return Game.findAll({
      order: [['date', 'DESC']],
      include: [{
        association: 'teams'
      }, {
        association: 'players'
      }]
    });
  }

  create(data) {
    return Game.create(data)
  }

  createTeamGame(data) {
    return TeamGame.create(data);
  }

  createGameUser(data) {
    return GameUser.create(data);
  }
}

module.exports = GameRepository;

const GameRepository = require('../repositories/game-repository');
const GameMapper = require('../mappers/game-mapper');

class gameService {
  constructor() {
    this.gameRepository = new GameRepository();
    this.gameMapper = new GameMapper();
  }

  getAll() {
    return this.gameRepository.getAll()
      .then(games => games.map(this.gameMapper.mapDatabaseToServiceModel));
  }

  create(data) {
    return this.gameRepository.create({
      date: new Date(),
      team1Id: data.team1.id,
      team2Id: data.team2.id,
      goalsTeam1: data.team1.goals,
      goalsTeam2: data.team2.goals,
    })
  }
}

module.exports = gameService;

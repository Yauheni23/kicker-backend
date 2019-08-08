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
      date: data.date,
      team1Id: data.teams[0].id,
      team2Id: data.teams[1].id,
      goalsTeam1: data.teams[0].goals,
      goalsTeam2: data.teams[1].goals,
    })
  }
}

module.exports = gameService;

function validateUsers(users) {
  return !users.some((user, index) => {
    for (let i = 0; i < users.length && i !== index; i++) {
      return user.id === users[i].id;
    }
  })
}

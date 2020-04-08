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
      tournamentId: data.tournamentId,
      completed: data.completed
    }).then(game => Promise.all(data.teams.map(team => this.gameRepository.createTeamGame({
      teamId: team.id,
      gameId: game.id,
      goals: team.goals
    }))))
      .then(teamsGame => Promise.all(data.teams.reduce((accumulator, currentValue, index) => {
        return accumulator.concat(currentValue.players.map(player => this.gameRepository.createGameUser({
          userId: player.id,
          goals: player.goals,
          gameId: teamsGame[index].gameId,
          teamId: currentValue.id
        })))
      }, [])))
  }
}

module.exports = gameService;

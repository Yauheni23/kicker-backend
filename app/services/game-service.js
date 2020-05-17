const GameRepository = require('../repositories/game-repository');
const GameMapper = require('../mappers/game-mapper');

class gameService {
    constructor () {
        this.gameRepository = new GameRepository();
        this.gameMapper = new GameMapper();
    }

    getAll (filter = {}) {
        return this.gameRepository.getAll()
            .then(games => {
                const mappedGames = games
                    .filter(game => game.players.some(player => +player.id === +filter.userId )|| !filter.userId)
                    .filter(game => game.teams.some(team => +team.id === +filter.teamId )|| !filter.teamId)
                    .map(this.gameMapper.mapDatabaseToServiceModel);
                return mappedGames
            });
    }

    create (data) {
        const winTeam = data.teams[0].goals === 10 ? data.teams[0] : data.teams[1];

        return this.gameRepository.create({
            date: new Date(),
            tournamentId: data.tournamentId,
            winTeamId: winTeam.id,
            winPlayer1Id: winTeam.players[0].id,
            winPlayer2Id: winTeam.players[1].id,
        })
            .then(game => Promise.all(data.teams.map(team => this.gameRepository.createTeamGame({
                teamId: team.id, gameId: game.id, goals: team.goals
            }))))
            .then(teamsGame => Promise.all(data.teams.reduce((accumulator, currentValue, index) => {
                return accumulator.concat(currentValue.players.map(player => this.gameRepository.createGameUser({
                    userId: player.id, goals: player.goals, gameId: teamsGame[index].gameId, teamId: currentValue.id
                })));
            }, [])));
    }
}

module.exports = gameService;

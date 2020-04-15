const TournamentRepository = require('../repositories/tournament-repository');
const TournamentMapper = require('../mappers/tournament-mapper');
const TeamService = require('../services/team-service');
const GameService = require('../services/game-service');

const defaultTournamentImage = 'http://172.18.144.38:8080/uploads/defaultTournament.svg';

class TournamentService {
  constructor() {
    this.tournamentRepository = new TournamentRepository();
    this.teamService = new TeamService();
    this.gameService = new GameService();
    this.tournamentMapper = new TournamentMapper();
  }

  getAll(filter = {}) {
    return this.tournamentRepository.getAll(filter)
      .then(users => users.map(this.tournamentMapper.mapDatabaseToServiceModel));
  }

  getById(id) {
    return this.tournamentRepository.getById(id)
      .then(user => {
        return this.tournamentMapper.mapDatabaseToServiceModel(user)
      });
  }

  async create(data) {
    const tournament = await this.tournamentRepository.create({
      name: data.name,
      image: data.image || defaultTournamentImage
    });

    const teams = await Promise.all(data.teams.map(team =>
      this.teamService.create({
        name: team.name,
        image: team.image,
      })));

    teams.forEach(team => {
      team.setTournament(tournament);
    });

    const players = await Promise.all(teams.reduce((accumulator, currentTeam, index) => {
        return accumulator.concat(data.teams[index].players.map(player => this.teamService.addUser({
          teamId: currentTeam.id,
          userId: player.id
        })))
      }, [])
    );

    return Promise.all(teams.reduce((accumulator, currentTeam, index) => {
      const playersFirstTeam = players.filter(player => player[0].teamId === currentTeam.id)
        .map(player => ({
          id: player[0].userId,
          goals: null
        }));
      return accumulator.concat(teams.slice(index + 1).map(team => {
        const playersSecondTeam = players.filter(player => player[0].teamId === team.id)
          .map(player => ({
            id: player[0].userId,
            goals: null
          }));
        return this.gameService.create({
          tournamentId: tournament.id,
          completed: false,
          teams: [{
            id: currentTeam.id,
            goals: null,
            players: playersFirstTeam
          }, {
            id: team.id,
            goals: null,
            players: playersSecondTeam
          }]
        })
      }))
    }, []));

  }

  update(data, options) {
    return this.tournamentRepository.update(data, options)
  }
}

module.exports = TournamentService;

function createGame(team1, team2) {
  return {
    tournamentId: tournament.id,
    completed: false,
    teams: [{
      id: request.body.team1.id,
      goals: request.body.team1.goals,
      players: [request.body.team1.player1, request.body.team1.player2]
    }, {
      id: request.body.team2.id,
      goals: request.body.team2.goals,
      players: [request.body.team2.player1, request.body.team2.player2]
    }]
  }
}

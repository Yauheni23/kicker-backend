const TeamRepository = require('../repositories/team-repository');
const TeamMapper = require('../mappers/team-mapper');

const defaultTeamImage = 'http://172.18.144.38:8080/uploads/defaultTeam.svg';

class TeamService {
  constructor() {
    this.teamRepository = new TeamRepository();
    this.teamMapper = new TeamMapper();
  }

  getAll() {
    return this.teamRepository.getAll()
      .then(teams => teams.map(this.teamMapper.mapDatabaseToServiceModel));
  }

  getById(id) {
    return this.teamRepository.getById(id)
      .then(user => {
        return this.teamMapper.mapDatabaseToServiceModel(user)
      });
  }

  create(data) {
    return this.teamRepository.create({
      name: data.name,
      image: data.image || defaultTeamImage,
      is_tournament_team: data.is_tournament_team
    })
  }

  addUser(data) {
    return this.teamRepository.addUser({
      teamId: data.teamId,
      userId: data.userId,
    })
  }
}

module.exports = TeamService;

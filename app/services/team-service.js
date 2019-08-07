const TeamRepository = require('../repositories/team-repository');
const TeamMapper = require('../mappers/team-mapper');

class TeamService {
  constructor() {
    this.teamRepository = new TeamRepository();
    this.teamMapper = new TeamMapper();
  }

  getAll() {
    return this.teamRepository.getAll()
      .then(teams => teams.map(this.teamMapper.mapDatabaseToServiceModel));
  }

  create(data) {
    return this.teamRepository.create({
      name: data.name,
      image: data.image
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

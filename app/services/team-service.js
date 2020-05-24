const TeamRepository = require('../repositories/team-repository');
const TeamMapper = require('../mappers/team-mapper');

const defaultTeamImage = 'https://myimagesforcoursework.s3.eu-central-1.amazonaws.com/image/team.png';

class TeamService {
  constructor() {
    this.teamRepository = new TeamRepository();
    this.teamMapper = new TeamMapper();
  }

  getAll(options = {}) {
    return this.teamRepository.getAll(options)
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
      captainId: data.captainId
    })
  }

  addUser(data) {
    return this.teamRepository.addUser({
      teamId: data.teamId,
      userId: data.userId,
    })
  }

  async update ({image}, options) {
    return this.teamRepository.update({
      image,
    }, options);
  }
}

module.exports = TeamService;

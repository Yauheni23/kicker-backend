const TeamService = require('../services/team-service');

const teamService = new TeamService();

module.exports = function (app) {
  app.route('/team')
    .get(getTeams)
    .post(createTeam);

  app.route('/team/user')
    .post(addUser);

  app.route('/team/:id')
    .get(getTeamById)
};

function getTeams(request, response) {
  teamService.getAll()
    .then(teams => response.send(teams))
    .catch(error => response.status(500).send(error));
}

function createTeam(request, response) {
  teamService.create(request.body)
    .then(team => response.send({
      id: team.id,
      name: team.name,
      image: team.image,
      goals: 0,
      games: [],
      users: []
    }))
    .catch(error => response.status(400).send(error.errors[0]));
}

function addUser(request, response) {
  teamService.addUser(request.body)
    .then(teams => response.send(teams))
    .catch(error => response.status(500).send(error));
}

function getTeamById(request, response) {
  teamService.getById(request.params.id)
    .then(user => response.send(user))
    .catch(error => response.status(500).send(error));
}
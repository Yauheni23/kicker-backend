const TeamService = require('../services/team-service');

const teamService = new TeamService();

module.exports = function (app) {
    app.route('/team')
        .get(getTeams)
        .post(createTeam);

    app.route('/team/user')
        .post(addUser);

    app.route('/team/:id')
        .get(getTeamById);
    app.route('/teamsUser/:id')
        .get(getTeamsUser);
};

function getTeams (request, response) {
    teamService.getAll()
        .then(teams => response.send(teams))
        .catch(error => response.status(500)
            .send(error));
}

function createTeam (request, response) {
    teamService.create(request.body)
        .then(async team => {
            await teamService.addUser({
                teamId: team.id, userId: request.body.captainId
            });

            return response.send({
                id: team.id, name: team.name, image: team.image, games: [], users: [], captainId: team.captainId
            });
        })
        .catch(error => response.status(400)
            .send(error.errors[0]));
}

function addUser (request, response) {
    teamService.addUser(request.body)
        .then(teams => response.send(teams))
        .catch(error => response.status(500)
            .send(error));
}

function getTeamById (request, response) {
    teamService.getById(request.params.id)
        .then(user => response.send(user))
        .catch(error => response.status(500)
            .send(error));
}

function getTeamsUser (request, response) {
    teamService.getAll({
        where: {
            captainId: request.params.id,
        }
    })
        .then(user => response.send(user))
        .catch(error => response.status(500)
            .send(error));
}

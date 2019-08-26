const TournamentService = require('../services/tournament-service');

const tournamentService = new TournamentService();

module.exports = function(app) {
  app.route('/tournament')
    .get(getAll)
    .post(createTournament);
  app.route('/tournament/current')
    .get(getCurrentTournaments);
  app.route('/tournament/completed')
    .get(getCompletedTournaments);
  app.route('/tournament/:id')
    .get(getTournamentById);
  // app.route('/game/:id')
  //   .put(updateGame);

};

function getAll(request, response) {
  tournamentService.getAll()
    .then(tournaments => response.send(tournaments))
    .catch(error => response.status(500).send(error));
}

function getCurrentTournaments(request, response) {
  tournamentService.getAll({
    where: {
      completed: false
    }
  }).then(tournaments => response.send(tournaments))
    .catch(error => response.status(500).send(error));
}

function getCompletedTournaments(request, response) {
  tournamentService.getAll({
    where: {
      completed: true
    }
  }).then(tournaments => response.send(tournaments))
    .catch(error => response.status(500).send(error));
}

function createTournament(request, response) {
  tournamentService.create(request.body)
    .then(tournament => response.send(tournament))
    .catch(error => response.status(400).send(error.errors[0]));
}

function getTournamentById(request, response) {
  tournamentService.getById(request.params.id)
    .then(tournament => response.send(tournament))
    .catch(error => response.status(500).send(error));
}

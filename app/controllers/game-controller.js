const GameService = require('../services/game-service');

const gameService = new GameService();

module.exports = function(app) {
  app.route('/game')
    .get(getGames)
    .post(createGame);
};

function getGames(request, response) {
  gameService.getAll(request.query)
    .then(games => response.send(games))
    .catch(error => response.status(500).send(error));
}

function createGame(request, response) {
  const data = {
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
  gameService.create(data)
    .then((game) => response.send(game))
    .catch(error => response.status(400).send(error));
}

const GameService = require('../services/game-service');
const UserService = require('../services/user-service');
const Op = require('sequelize').Op;

const gameService = new GameService();
const userService = new UserService();

module.exports = function(app) {
  app.route('/game')
    .get(getGames)
    .post(createGame, addResultGame);
};

function getGames(request, response) {
  gameService.getAll()
    .then(games => response.send(games))
    .catch(error => response.status(500).send(error));
}

function createGame(request, response, next) {
  gameService.create(request.body)
    .then(() => next())
    .catch(error => response.status(400).send(error.errors[0]));
}

function addResultGame(request, response) {
  const users = [request.body.team1.player1, request.body.team1.player2,
    request.body.team2.player1, request.body.team2.player2];
  const filter = filterUsers(users);

  userService.getAll(filter)
    .then(updateUsersScope)
    .then(result => {
      response.send(result);
    })
    .catch(error => response.status(500).send(error));

  function updateUsersScope(usersDatabase) {
    return Promise.all(usersDatabase.map(user =>
      userService.update({
        countGame: user.countGame + 1,
        scope: user.scope + users.find(el => el.id === user.id).goals
      }, {
        where: {
          id: user.id
        }
      })
    ))
  }
}

function filterUsers(users) {
  return {
    where: {
      [Op.or]: [].concat(users.map(user => ({ id: user.id })))
    }
  };
}



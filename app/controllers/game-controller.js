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
  const filter = {
    where: {
      [Op.or]: [].concat(request.body.users.map(user => ({ id: user.id })))
    }
  };

  userService.getAll(filter)
    .then(updateUsersScope)
    .then(result => {
      response.send(result);
    })
    .catch(error => response.status(500).send(error));

  function updateUsersScope(users) {
    return Promise.all(users.map(user =>
      userService.update({
        countGame: user.countGame + 1,
        scope: user.scope + request.body.users.find(el => el.id === user.id).goals
      }, {
        where: {
          id: user.id
        }
      })
    ))
  }
}



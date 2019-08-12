const UserService = require('../services/user-service');

const userService = new UserService();

module.exports = function(app) {
  app.route('/user')
    .get(getUsers)
    .post(createUser);
  app.route('/user/:id')
    .get(getUserById)
};

function getUsers(request, response) {
  userService.getAll()
    .then(users => response.send(users))
    .catch(error => response.status(500).send(error));
}

function createUser(request, response) {
  userService.create(request.body)
    .then(user => response.send({
      id: user.id,
      name: user.name,
      image: user.image,
      scope: user.scope,
      countGame: user.scope,
      teams: [],
      games: []
    }))
    .catch(error => response.status(400).send(error.errors[0]));
}

function getUserById(request, response) {
  userService.getById(request.params.id)
    .then(user => response.send(user))
    .catch(error => response.status(500).send(error));
}

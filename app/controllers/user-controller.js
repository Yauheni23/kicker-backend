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
    .then(user => response.send(user))
    .catch(error => response.status(500).send(error));
}

function getUserById(request, response) {
  userService.getById(request.params.id)
    .then(user => response.send(user))
    .catch(error => response.status(500).send(error));
}

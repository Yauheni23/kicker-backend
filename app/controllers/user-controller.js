const UserService = require('../services/user-service');

const userService = new UserService();

module.exports = function (app) {
    app.route('/login')
        .post(login);
    app.route('/register')
        .post(register);
    app.route('/user')
        .get(getUsers);
    app.route('/user/:id')
        .get(getUserById)
        .put(updateUser);
};

function login (request, response) {
    userService.login(request.body).then(user => response.send(user));
}

function register (request, response) {
    userService.register(request.body).then(user => response.send(user));
}

function getUsers (request, response) {
    userService.getAll()
        .then(users => response.send(users))
        .catch(error => response.status(500)
            .send(error));
}

function getUserById (request, response) {
    userService.getById(request.params.id)
        .then(user => response.send(user))
        .catch(error => response.status(500)
            .send(error));
}

function updateUser (request, response) {
    userService.update(request.body, {where: {id: request.params.id}})
        .then(user => response.send(user))
        .catch(error => response.status(500)
            .send(error));
}

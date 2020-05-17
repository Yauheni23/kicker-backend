const SpaceService = require('../services/space-service');

const spaceService = new SpaceService();

module.exports = function (app) {
    app.route('/login')
        .post(login);
    app.route('/register')
        .post(register);
    app.route('/space')
        .get(getUsers)
        .post(createUser);
    app.route('/user/:id')
        .get(getUserById)
        .put(updateUser);
};

function getUsers (request, response) {
    spaceService.getAll()
        .then(users => response.send(users))
        .catch(error => response.status(500)
            .send(error));
}

function createUser (request, response) {
    spaceService.create(request.body)
        .then(user => response.send({
            id: user.id, name: user.name, image: user.image, teams: [], games: []
        }))
        .catch(error => response.status(400)
            .send(error.errors[0]));
}

function getUserById (request, response) {
    spaceService.getById(request.params.id)
        .then(user => response.send(user))
        .catch(error => response.status(500)
            .send(error));
}

function updateUser (request, response) {
    spaceService.update(request.body, {
        where: {
            id: request.params.id
        }
    })
        .then(user => response.send(user))
        .catch(error => response.status(500)
            .send(error));
}

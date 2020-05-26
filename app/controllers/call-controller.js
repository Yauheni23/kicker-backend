const CallService = require('../services/call-service');
const {} = require('../db/db.config.js');

const callService = new CallService();

module.exports = function (app) {
    app.route('/call')
        .get(getCalls)
        .post(createCall)
        .put(updateCall)
        .delete(deleteCall);
};

function getCalls (request, response) {
    callService.getAll(request.query)
        .then(call => response.send(call))
        .catch(error => response.status(500)
            .send(error));
}

function createCall (request, response) {
    callService.create(request.body)
        .then(call => response.send(call))
        .catch(error => response.status(500)
            .send(error));
}

function updateCall ({body, query: {id}}, response) {
    callService.update(body, {where: {id}})
        .then(call => response.send(call))
        .catch(() => response.sendStatus(400));
}

function deleteCall ({ query: {id}}, response) {
    callService.destroy({where: {id}})
        .then(() => response.sendStatus(200))
        .catch((error) => {
            console.log(error)
            response.sendStatus(400)
        });
}

const AdminService = require('../services/admin-service');

const adminService = new AdminService();

module.exports = function (app) {
  app.route('/login')
    .post(login);
  app.route('/register')
    .post(register)
};


function login(request, response) {
  adminService.getAdmin({
    where: {
      name: request.body.name,
    }
  }, request.body.password)
    .then(user => response.send({
      id: user.id,
      name: user.name,
    }))
    .catch(error => response.status(400).send({message: error.message}));
}

function register(request, response) {
  adminService.create(request.body)
    .then(user => response.send({
      id: user.id,
      name: user.name,
    }))
    .catch(error => response.status(400).send({message: error.errors[0].message}));
}

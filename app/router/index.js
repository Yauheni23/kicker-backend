const initializeUserController = require('../controllers/user-controller');
const initializeTeamController = require('../controllers/team-controller');
const initializeGameController = require('../controllers/game-controller');
const initializeAdminController = require('../controllers/admin-controller');
const initializeTournamentController = require('../controllers/tournament-controller');
const upload = require('../utils/upload');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  initializeUserController(app);
  initializeTeamController(app);
  initializeGameController(app);
  initializeAdminController(app);
  initializeTournamentController(app);

  app.post('/image', upload)
};

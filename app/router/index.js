const initializeUserController = require('../controllers/user-controller');
const initializeTeamController = require('../controllers/team-controller');
const initializeGameController = require('../controllers/game-controller');
const upload = require('../utils/upload');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, token');
    next();
  });

  initializeUserController(app);
  initializeTeamController(app);
  initializeGameController(app);

  app.post('/image', upload)
};

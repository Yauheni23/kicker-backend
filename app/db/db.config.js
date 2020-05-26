const isDevMode = process.argv[2] === 'dev';
const prefixEnv = isDevMode ? 'DEV_' : '';
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  username: process.env[`${prefixEnv}DB_USER`],
  database: process.env[`${prefixEnv}DB_NAME`],
  password: process.env[`${prefixEnv}DB_PASS`],
  host: process.env[`${prefixEnv}DB_HOST`],
  logging: false,
  port: 5432,
  ssl: true,
  dialect: 'postgres',
  dialectOptions: {
    "ssl": {"require": true}
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Game = require('../models/game')(sequelize, Sequelize);
db.User = require('../models/user')(sequelize, Sequelize);
db.Team = require('../models/team')(sequelize, Sequelize);
db.Space = require('../models/space')(sequelize, Sequelize);
db.TeamGame = require('../models/teamGame')(sequelize, Sequelize);
db.GameUser = require('../models/gameUser')(sequelize, Sequelize);
db.UserSpace = require('../models/userSpace')(sequelize, Sequelize);
db.Call = require('../models/call')(sequelize, Sequelize);
db.Status = require('../models/status')(sequelize, Sequelize);

db.Status.belongsToMany(db.Call, { through: 'callStatus', foreignKey: 'statusId', otherKey: 'callId'});
db.Call.belongsToMany(db.Status, { through: 'callStatus', foreignKey: 'callId', otherKey: 'statusId', as: 'Status'});

db.Call.belongsTo(db.Team, {as: 'creator'});
db.Team.hasMany(db.Call, {foreignKey: 'creatorId', as: 'yourCalls'});

db.Call.belongsTo(db.Team, {as: 'opponent'});
db.Team.hasMany(db.Call, {foreignKey: 'opponentId', as: 'calls'});

db.Team.belongsToMany(db.User, {
  through: 'teamPlayers',
  as: 'users',
  foreignKey: 'teamId',
  otherKey: 'userId'
});

db.User.belongsToMany(db.Team, {
  through: 'teamPlayers',
  foreignKey: 'userId',
  otherKey: 'teamId'
});

db.Game.belongsToMany(db.Team, {
  through: 'teamGames',
  as: 'teams',
  foreignKey: 'gameId',
  otherKey: 'teamId'
});

db.Team.belongsToMany(db.Game, {
  through: 'teamGames',
  as: 'games',
  foreignKey: 'teamId',
  otherKey: 'gameId'
});

db.Game.belongsToMany(db.User, {
  through: 'gameUsers',
  as: 'players',
  foreignKey: 'gameId',
  otherKey: 'userId'
});

db.User.belongsToMany(db.Game, {
  through: 'gameUsers',
  foreignKey: 'userId',
  otherKey: 'gameId'
});

db.GameUser.belongsTo(db.Team, {as: 'team'});
db.Team.hasMany(db.GameUser, {foreignKey: 'teamId', as: 'players'});

db.Team.belongsTo(db.User, {as: 'captain'});
db.User.hasMany(db.Team, {foreignKey: 'captainId', as: 'myTeam'});

db.Space.belongsToMany(db.User, {
  through: 'userSpaces',
  as: 'space',
  foreignKey: 'spaceId',
  otherKey: 'userId'
});

db.User.belongsToMany(db.Space, {
  through: 'userSpaces',
  as: 'space',
  foreignKey: 'spaceId',
  otherKey: 'userId'
});

db.Space.belongsToMany(db.User, {
  through: 'adminSpaces',
  as: 'admins',
  foreignKey: 'spaceId',
  otherKey: 'userId'
});

db.User.belongsToMany(db.Space, {
  through: 'adminSpaces',
  as: 'yourSpace',
  foreignKey: 'spaceId',
  otherKey: 'userId'
});

db.Game.belongsTo(db.Space, {as: 'space'});
db.Space.hasMany(db.Game, {foreignKey: 'spaceId', as: 'games'});

db.Team.belongsTo(db.Space, {as: 'space'});
db.Space.hasMany(db.Team, {foreignKey: 'spaceId', as: 'teams'});

module.exports = db;

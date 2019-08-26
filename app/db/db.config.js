const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  username: process.argv[2] === 'test' ? process.env.DB_USER_TEST : process.env.DB_USER,
  database: process.argv[2] === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME,
  password: process.argv[2] === 'test' ? process.env.DB_PASS_TEST : process.env.DB_PASS,
  host: process.argv[2] === 'test' ? process.env.DB_HOST_TEST : process.env.DB_HOST,
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
db.Tournament = require('../models/tournament')(sequelize, Sequelize);
db.TeamGame = require('../models/teamGame')(sequelize, Sequelize);
db.GameUser = require('../models/gameUser')(sequelize, Sequelize);

db.Team.belongsToMany(db.User, {
  through: 'teamPlayer',
  as: 'users',
  foreignKey: 'teamId',
  otherKey: 'userId'
});

db.User.belongsToMany(db.Team, {
  through: 'teamPlayer',
  foreignKey: 'userId',
  otherKey: 'teamId'
});



db.Tournament.belongsToMany(db.Team, {
  through: 'teamTournament',
  as: 'teams',
  foreignKey: 'tournamentId',
  otherKey: 'teamId'
});

db.Team.belongsToMany(db.Tournament, {
  through: 'teamTournament',
  as: 'tournament',
  foreignKey: 'teamId',
  otherKey: 'tournamentId'
});




db.Game.belongsToMany(db.Team, {
  through: 'teamGame',
  as: 'teams',
  foreignKey: 'gameId',
  otherKey: 'teamId'
});

db.Team.belongsToMany(db.Game, {
  through: 'teamGame',
  as: 'games',
  foreignKey: 'teamId',
  otherKey: 'gameId'
});



db.Game.belongsToMany(db.User, {
  through: 'gameUser',
  as: 'players',
  foreignKey: 'gameId',
  otherKey: 'userId'
});

db.User.belongsToMany(db.Game, {
  through: 'gameUser',
  foreignKey: 'userId',
  otherKey: 'gameId'
});

db.GameUser.belongsTo(db.Team, {as: 'team'});
db.Team.hasMany(db.GameUser, {foreignKey: 'teamId', as: 'players'});

db.Game.belongsTo(db.Tournament, {as: 'tournament'});
db.Tournament.hasMany(db.Game, {foreignKey: 'tournamentId', as: 'games'});

module.exports = db;

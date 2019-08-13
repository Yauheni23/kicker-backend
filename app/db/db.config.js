const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: 5432,
  ssl: true,
  dialect: 'postgres',
  dialectOptions: {
    "ssl": { "require": true }
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Game = require('../models/game')(sequelize, Sequelize);
db.User = require('../models/user')(sequelize, Sequelize);
db.Team = require('../models/team')(sequelize, Sequelize);
db.TeamPlayer = require('../models/teamPlayer')(sequelize, Sequelize);

db.Team.belongsToMany(db.User, {
  as: 'users',
  through: { model: db.TeamPlayer },
  foreignKey: 'teamId'
})

db.User.belongsToMany(db.Team, {
  as: 'teams',
  through: { model: db.TeamPlayer },
  foreignKey: 'userId'
})

db.Game.belongsTo(db.Team, { as: 'team1' });
db.Game.belongsTo(db.Team, { as: 'team2' });
db.Team.hasMany(db.Game, { foreignKey: 'team1Id', as: 'games1' });
db.Team.hasMany(db.Game, { foreignKey: 'team2Id', as: 'games2' });


module.exports = db;

class TeamMapper {
  mapDatabaseToServiceModel(team) {
    return {
      id: team.id,
      name: team.name,
      image: team.image,
      users: team.users.map(mapDatabaseUsers),
      goals: reduceCountGoals(team.id, team.games1.concat(team.games2)),
      games: team.games1.concat(team.games2).map(mapDatabaseGames),
    };
  }
}

function mapDatabaseUsers(user) {
  return {
    id: user.id,
    name: user.name,
    image: user.image,
    scope: user.scope,
    countGame: user.countGame
  }
}

function mapDatabaseGames(game) {
  return {
    id: game.id,
    date: game.date,
    team1: {
      id: game.team1.id,
      name: game.team1.name,
      image: game.team1.image,
      goals: game.goalsTeam1
    },
    team2: {
      id: game.team2.id,
      name: game.team2.name,
      image: game.team2.image,
      goals: game.goalsTeam2
    },
  }
}

function reduceCountGoals(id, games) {
  return games.reduce((accumulator, game) => {
    return accumulator + (game.team1.id === id ? game.goalsTeam1 : game.goalsTeam2);
  }, 0)
}

module.exports = TeamMapper;

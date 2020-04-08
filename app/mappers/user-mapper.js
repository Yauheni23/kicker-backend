class UserMapper {
  mapDatabaseToServiceModel(user) {
    return {
      id: user.id,
      name: user.name,
      image: user.image,
      mail: user.mail,
      teams: user.teams.map(mapDatabaseTeams),
      games: user.games.filter(game => game.completed).map(game => ({
        id: game.id,
        date: game.date,
        goals: game.gameUser.goals
      }))
    };
  }
}

function mapDatabaseTeams(team) {
  return {
    id: team.id,
    name: team.name,
    image: team.image,
  }
}

module.exports = UserMapper;

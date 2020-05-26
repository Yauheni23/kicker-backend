class UserMapper {
  mapDatabaseToServiceModel(user) {
    return {
      id: user.id,
      name: user.name,
      image: user.image,
      mail: user.mail,
      teams: user.teams.map(mapDatabaseTeams),
      games: user.games.map(game => ({
        id: game.id,
        date: game.date,
        goals: game.gameUsers.goals || 0
      }))
    };
  }
}

function mapDatabaseTeams(team) {
  return {
    id: team.id,
    name: team.name,
    image: team.image,
    captainId: team.captainId,
  }
}

module.exports = UserMapper;

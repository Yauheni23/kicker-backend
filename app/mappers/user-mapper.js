class UserMapper {
  mapDatabaseToServiceModel(user) {
    return {
      id: user.id,
      name: user.name,
      image: user.image,
      scope: user.scope,
      countGame: user.countGame,
      teams: user.teams.map(mapDatabaseTeams),
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

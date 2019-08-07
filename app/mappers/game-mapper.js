class GameMapper {
  mapDatabaseToServiceModel(game) {
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
      }
    };
  }
}

module.exports = GameMapper;

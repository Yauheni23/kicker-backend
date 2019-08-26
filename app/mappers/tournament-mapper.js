class TournamentMapper {
  mapDatabaseToServiceModel(tournament) {
    return {
      id: tournament.id,
      name: tournament.name,
      image: tournament.image,
      teams: tournament.teams.map(team => ({
        id: team.id,
        name: team.name,
        image: team.image,
        players: team.users.map(user => ({
          id: user.id,
          name: user.name,
          image: user.image
        }))
      })),
      games: tournament.games.map(game => ({
        id: game.id,
        date: game.date,
        teams: game.teams.map(team => ({
          id: team.id,
          name: team.name,
          image: team.image,
          goals: team.teamGame.goals,
          players: game.players.filter(player => player.gameUser.teamId === team.id).map(player => ({
            id: player.id,
            name: player.name,
            image: player.image,
            goals: player.gameUser.goals
          }))
        }))
      }))
    }
  }
}

module.exports = TournamentMapper;

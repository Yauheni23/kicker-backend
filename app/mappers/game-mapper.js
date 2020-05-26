class GameMapper {
    mapDatabaseToServiceModel (game) {
        return {
            id: game.id,
            date: game.date,
            winTeamId: game.winTeamId,
            winPlayers: [game.winPlayer1Id, game.winPlayer2Id],
            team1: {
                id: game.teams[0].id,
                name: game.teams[0].name,
                image: game.teams[0].image,
                goals: game.teams[0].teamGames.goals,
                players: game.players.filter(player => game.teams[0].id === player.gameUsers.teamId)
                    .map(player => ({
                        id: player.id, name: player.name, image: player.image, goals: player.gameUsers.goals
                    }))
            },
            team2: {
                id: game.teams[1].id,
                name: game.teams[1].name,
                image: game.teams[1].image,
                goals: game.teams[1].teamGames.goals,
                players: game.players.filter(player => game.teams[1].id === player.gameUsers.teamId)
                    .map(player => ({
                        id: player.id, name: player.name, image: player.image, goals: player.gameUsers.goals
                    }))
            }
        };
    }
}

module.exports = GameMapper;

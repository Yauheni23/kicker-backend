const GAME = 'game';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(GAME, {
        date: {
            type: Sequelize.DATE
        },
        goalsTeam1: {
            type: Sequelize.INTEGER
        },
        goalsTeam2: {
            type: Sequelize.INTEGER
        }
    },{
        validate: {
            validateGoals: function () {
                if( this.goalsTeam1 === this.goalsTeam2 || (this.goalsTeam1 !== 10 && this.goalsTeam2 !== 10)) {
                    throw new Error('Goals is invalid');
                }
            },
            validateTeam() {
                if(this.team1Id === this.team2Id) {
                    throw new Error('Teams is invalid');
                }
            }
        }
    });
};

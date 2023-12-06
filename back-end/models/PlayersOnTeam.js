const mongoose = require('mongoose');

const playersOnTeamSchema = new mongoose.Schema({
    teamName: String,
    Players:[
        {
            playerName: String,
            playerLastName: String,
            playerId: String

            
        }
    ],
    lastUpdated: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('PlayersOnTeam', playersOnTeamSchema);
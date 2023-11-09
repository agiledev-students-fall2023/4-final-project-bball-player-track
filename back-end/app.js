const express = require("express");
const app = express();
const path = require("path");
const fetch = require('node-fetch');
const axios = require("axios");
require("dotenv").config({ silent: true });
const morgan = require("morgan");
app.use(morgan("dev"));
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use("/static", express.static("public"));


app.get("/", async (req, res) => {
    try {
        const [playerResponse, teamResponse] = await Promise.all([
            axios.get('https://www.balldontlie.io/api/v1/players'),
            axios.get('https://www.balldontlie.io/api/v1/teams')
            
        ]);
        const players = playerResponse.data.data;
        const shuffledPlayers = players.sort(() => 0.5 - Math.random());
        const selectedPlayers = shuffledPlayers.slice(0, 20);

        const teams = teamResponse.data.data;
        const shuffledTeams = teams.sort(() => 0.5 - Math.random());
        const selectedTeams = shuffledTeams.slice(0, 20);
        const data = {
            players: selectedPlayers,
            teams: selectedTeams
        };
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.get('/favorites', async (req, res) => {
    try {
        // Fetch player stats from the API
        const response = await axios.get('https://www.balldontlie.io/api/v1/stats', {
            // Additional parameters can be added here to filter the stats as needed
        });
  
        // Check if the API returned a list of player stats
        if (response.data && response.data.data) {
            const playerStats = response.data.data;
            // Process and format the dates
            const formattedPlayerStats = playerStats.map(player => {
                const gameDate = new Date(player.game.date);
                // Format the date to YYYY-MM-DD
                const formattedDate = gameDate.toISOString().split('T')[0];
                return {
                    ...player,
                    game: {
                        ...player.game,
                        date: formattedDate
                    }
                };
            });
  
            // Shuffle the array and pick the first 10 items
            const shuffledStats = formattedPlayerStats.sort(() => 0.5 - Math.random());
            const selectedStats = shuffledStats.slice(0, 10);
            
            // Send the selected stats to the front end
            res.json(selectedStats);
        } else {
            res.status(404).json({ message: 'No player stats found' });
        }
    } catch (error) {
        console.error('Error fetching player stats: ', error);
        res.status(500).json({ message: 'Error fetching player stats' });
    }
});
app.get('/api/teams/stats', async (req, res) => {
    try {
      const response = await axios.get('https://www.balldontlie.io/api/v1/teams');
  
      // Check if the API returned a list of teams
      if (response.data && response.data.data) {
        const teams = response.data.data;
  
        // Initialize team stats
        let teamStats = {};
  
        teams.forEach(team => {
          teamStats[team.id] = {
            id: team.id,
            full_name: team.full_name,
            wins: 0,
            losses: 0,
            // ... (initialize other stats)
          };
        });
  
        // Fetch games and update team stats
        const today = new Date();
        const endDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        const gamesResponse = await axios.get(`https://www.balldontlie.io/api/v1/games?start_date=2023-10-18&end_date=${endDate}&per_page=100&page=1`);
        if (gamesResponse.data && gamesResponse.data.data) {
          const games = gamesResponse.data.data;
  
          games.forEach(game => {
            const homeTeam = teamStats[game.home_team.id];
            const visitorTeam = teamStats[game.visitor_team.id];
  
            // Determine win or loss
            if (game.home_team_score > game.visitor_team_score) {
              homeTeam.wins += 1;
              visitorTeam.losses += 1;
            } else {
              homeTeam.losses += 1;
              visitorTeam.wins += 1;
            }
  
            // ... (aggregate other stats)
          });
        }
  
        // Convert to array
        const statsArray = Object.values(teamStats);
  
        res.json(statsArray);
      } else {
        res.status(404).json({ message: 'No teams found' });
      }
    } catch (error) {
      console.error('Error fetching team stats: ', error);
      res.status(500).json({ message: 'Error fetching team stats' });
    }
});
  


  
 
module.exports = app
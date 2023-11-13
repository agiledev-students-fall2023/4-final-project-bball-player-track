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
let users = {
  'user1': '1',
  'user2': '2'
};

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username] === password) {
      res.status(200).json({ message: 'Welcome' });
  } else {
      res.status(401).json({ message: 'Login failed' });
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

app.get("/games", async (req, res) => {
  try {

    const options = {
        /*
        params: {
        seasons: [2023,2022]
        }*/
      };

      // Fetch player stats from the API

      const response = await axios.get('https://www.balldontlie.io/api/v1/games',options);

      // Check if the API returned a list of player stats
      if(response.data && response.data.data) {
          const games = response.data.data;
          // Process and format the dates
          const formattedPlayerStats = games.map((game,index) => {
              const formattedDate = game.date.split('T')[0];
              game.date = formattedDate;
              return game;
          });
          
          // Send the selected stats to the front end
          //console.table(formattedPlayerStats);
          res.json(formattedPlayerStats);
      } else {
          res.status(404).json({ message: 'No player stats found' });
      }
  } catch (error) {
      console.error('Error fetching player stats: ', error);
      res.status(500).json({ message: 'Error fetching player stats' });
  }
});

app.get('/api/players/stats', async (req, res) => {
  try {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const endDate = `${today.getFullYear()}-${month}-${day}`;

    let currentPage = 1;
    const maxPagesToFetch = 20; // Set a limit to page 30
    const playerAggregates = {};

    do {
      const response = await axios.get(`https://www.balldontlie.io/api/v1/stats?start_date=2023-10-18&end_date=${endDate}&per_page=100&page=${currentPage}`);

      if (response.data && response.data.data) {
        // Aggregate data by player
        response.data.data.forEach(playerStat => {
          const playerId = playerStat.player.id;
          if (!playerAggregates[playerId]) {
            playerAggregates[playerId] = {
              fullName: `${playerStat.player.first_name} ${playerStat.player.last_name}`,
              totalPts: 0,
              totalAst: 0,
              totalReb: 0,
              totalStl: 0,
              gamesPlayed: 0
            };
          }
          playerAggregates[playerId].totalPts += playerStat.pts;
          playerAggregates[playerId].totalAst += playerStat.ast;
          playerAggregates[playerId].totalReb += playerStat.reb;
          playerAggregates[playerId].totalStl += playerStat.stl;
          playerAggregates[playerId].gamesPlayed += 1;
        });

        currentPage++;
      } else {
        res.status(404).json({ message: 'No stats found' });
        return;
      }
    } while (currentPage <= maxPagesToFetch);

    // Calculate averages and convert to float rounded to two decimal places
    const processedStats = Object.values(playerAggregates).map(player => ({
      fullName: player.fullName,
      ppg: parseFloat((player.totalPts / player.gamesPlayed).toFixed(2)),
      apg: parseFloat((player.totalAst / player.gamesPlayed).toFixed(2)),
      rpg: parseFloat((player.totalReb / player.gamesPlayed).toFixed(2)),
      spg: parseFloat((player.totalStl / player.gamesPlayed).toFixed(2))
    }));

    // Sort by PPG and get top 20
    const topStats = processedStats.sort((a, b) => b.ppg - a.ppg).slice(0, 20);

    res.json(topStats);
  } catch (error) {
    console.error('Error fetching player stats: ', error);
    res.status(500).json({ message: 'Error fetching player stats' });
  }



});

app.get('/api/playersonteam/:teamName', async (req, res) => {
  const teamName = req.params.teamName;



  try {
    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentYear = currentDate.getFullYear();
    const currentDateFinal = `${currentMonth}/${currentDay}/${currentYear}`;
  
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 14); 
    const oneWeekAgoMonth = String(oneWeekAgo.getMonth() + 1).padStart(2, '0');
    const oneWeekAgoDay = String(oneWeekAgo.getDate()).padStart(2, '0');
    const oneWeekAgoYear = oneWeekAgo.getFullYear();
    const oneWeekAgoFinal = `${oneWeekAgoMonth}/${oneWeekAgoDay}/${oneWeekAgoYear}`;
    
    const firstResponse = await axios.get('https://www.balldontlie.io/api/v1/stats?start_date=${oneWeeksAgoFinal}&end_date=${currentDateFinal}');
    const totalPages = response.data.meta.total_pages;

    let playersOnTeam = [];

    for (let page = 1; page <= totalPages; page ++){
      const currentResponse = await axios.get('https://www.balldontlie.io/api/v1/stats?start_date=${oneWeeksAgoFinal}&end_date=${currentDateFinal}&page=${page}');
      const currentData = currentResponse.data.data;

      currentData.forEach(item =>{
        if (item.team.full_name === teamName){
          const playerSeenAlready = playersOnTeam.find(player=> player.playerId === item.player.id);
          if (!playerSeenAlready){
            playersOnTeam.push({
              playerName: item.player.full_name,
              playerId: item.player.id
            })
          }
        }
      })
    }
    res.json(playersOnTeam);
    





  } catch (error) {
      console.error('Error fetching team players: ', error);
      res.status(500).json({ message: 'Error fetching team players ' });
  }




})

 
module.exports = app
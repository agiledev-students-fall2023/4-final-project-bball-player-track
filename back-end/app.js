const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser")
const fetch = require('node-fetch');
const axios = require("axios");
require("dotenv").config({ silent: true });
const morgan = require("morgan");

const cors = require('cors');
const authenticationRoutes = require("./routes/authentication.js")
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")
const { MongoClient, ServerApiVersion } = require('mongodb');
const User = require("./models/User.js")


const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `mongodb+srv://${username}:${password}@bballplayertrack.yldebfu.mongodb.net/?retryWrites=true&w=majority`;
try {
  mongoose.connect(uri);
  console.log(`Connected to MongoDB.`)
} catch (err) {
  console.log(
    `Error connecting to MongoDB user account authentication will fail: ${err}`
  )
}

const router = express.Router();

app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({
  origin: `${process.env.REACT_APP_FRONTEND}`
}));

app.use("/static", express.static("public"));
app.use("/auth", authenticationRoutes());

const Feedback = require("./models/Feedback.js");

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


router.get('/searchPlayer', async (req, res) => {
  const searchTerm = req.query.query;

  try {
    const response = await axios.get(`https://www.balldontlie.io/api/v1/players?search=${searchTerm}`);
    res.json(response.data.data);
  } catch (error) {
    console.error('Error searching players:', error);
    res.status(500).json({ message: 'Error searching players' });
  }
});

app.post('/user/:userId/addFavorite', async (req, res) => {
  const { userId } = req.params;
  const { playerId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const isAlreadyFavorite = user.favorites.includes(playerId);
    if (isAlreadyFavorite) {
      return res.status(400).send('Player is already in favorites');
    }

    user.favorites.push(playerId);
    await user.save();

    res.status(200).send('Player added to favorites');
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/user/:userId/favorites', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const favorites = user.favorites;

    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error fetching favorites' });
  }
});
app.delete('/user/:userId/removeFavorite', async (req, res) => {
  const { userId } = req.params;
  const { playerId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const playerIdIndex = user.favorites.findIndex(id => id.toString() === playerId.toString());
    if (playerIdIndex === -1) {
      return res.status(404).send('Favorite player not found in user favorites');
    }

    user.favorites.splice(playerIdIndex, 1);
    await user.save();

    res.status(200).send('Favorite player removed');
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

app.post('/', body('feedback').not().isEmpty().withMessage('You must input something'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const feedback = new Feedback({
      feedback: req.body.feedback
    });

    await feedback.save();
    res.send({ status: 'Feedback saved' });
  } catch (err) {
    res.status(500).send({ status: 'You must input something', error: err });
  }
})



app.get('/favorites', async (req, res) => {
  try {
    const response = await axios.get('https://www.balldontlie.io/api/v1/stats', {
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

    if (response.data && response.data.data) {
      const teams = response.data.data;
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
      let page = 1;
      let totalPages = 1;

      do {
        const gamesResponse = await axios.get(`https://www.balldontlie.io/api/v1/games?start_date=2023-10-18&end_date=${endDate}&per_page=100&page=${page}`);
        if (gamesResponse.data && gamesResponse.data.data) {
          const games = gamesResponse.data.data;
          totalPages = gamesResponse.data.meta.total_pages;

          games.forEach(game => {
            const homeTeam = teamStats[game.home_team.id];
            const visitorTeam = teamStats[game.visitor_team.id];

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
        page++;
      } while (page <= totalPages);

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
      seasons: [2023,2022,1998]
      }*/
    };

    // Fetch player stats from the API

    const response = await axios.get('https://www.balldontlie.io/api/v1/games', options);

    // Check if the API returned a list of player stats
    if (response.data && response.data.data) {
      const games = response.data.data;
      // Process and format the dates
      const formattedPlayerStats = games.map((game, index) => {
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

const Decimal = require('decimal.js'); // Import Decimal
const PlayerStat = require("./models/PlayerStat.js"); // Import the PlayerStat model

app.get('/api/players/stats', async (req, res) => {
  try {
    const forceRefresh = req.query.forceRefresh === 'true';
    const lastUpdateThreshold = 24 * 60 * 60 * 1000;

    if (!forceRefresh) {
      const lastStats = await PlayerStat.findOne().sort({ lastUpdated: -1 });
      if (lastStats && new Date() - lastStats.lastUpdated < lastUpdateThreshold) {
        return res.json(await PlayerStat.find());
      }
    }

    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const endDate = `${today.getFullYear()}-${month}-${day}`;

    let currentPage = 1;
    let totalPages = 0;
    const playerAggregates = {};
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const initialResponse = await axios.get(`https://www.balldontlie.io/api/v1/stats?start_date=2023-10-18&end_date=${endDate}&per_page=100&page=${currentPage}`);
    totalPages = initialResponse.data.meta.total_pages;

    do {
      console.log(`Fetching data for page ${currentPage}`);
      const response = await axios.get(`https://www.balldontlie.io/api/v1/stats?start_date=2023-10-18&end_date=${endDate}&per_page=100&page=${currentPage}`);

      if (response.data && response.data.data) {
        response.data.data.forEach(playerStat => {
          const playerId = playerStat.player.id;
          if (!playerAggregates[playerId]) {
            playerAggregates[playerId] = {
              fullName: `${playerStat.player.first_name} ${playerStat.player.last_name}`,
              totalPts: new Decimal(0),
              totalAst: new Decimal(0),
              totalReb: new Decimal(0),
              totalStl: new Decimal(0),
              gamesPlayed: 0
            };
          }
          playerAggregates[playerId].totalPts = playerAggregates[playerId].totalPts.plus(playerStat.pts);
          playerAggregates[playerId].totalAst = playerAggregates[playerId].totalAst.plus(playerStat.ast);
          playerAggregates[playerId].totalReb = playerAggregates[playerId].totalReb.plus(playerStat.reb);
          playerAggregates[playerId].totalStl = playerAggregates[playerId].totalStl.plus(playerStat.stl);
          if (playerStat.min && playerStat.min !== "0:00") {
            playerAggregates[playerId].gamesPlayed += 1;
          }

        });

        currentPage++;
      } else {
        res.status(404).json({ message: 'No stats found' });
        return;
      }

      await delay(3000);

    } while (currentPage <= totalPages);

    const processedStats = Object.values(playerAggregates).map(player => ({
      fullName: player.fullName,
      ppg: player.totalPts.div(player.gamesPlayed).toFixed(2),
      apg: player.totalAst.div(player.gamesPlayed).toFixed(2),
      rpg: player.totalReb.div(player.gamesPlayed).toFixed(2),
      spg: player.totalStl.div(player.gamesPlayed).toFixed(2),
      lastUpdated: new Date()
    }));

    await PlayerStat.deleteMany({});
    await PlayerStat.insertMany(processedStats);

    res.json(processedStats);
  } catch (error) {
    console.error('Error fetching player stats: ', error);
    res.status(500).json({ message: 'Error fetching player stats' });
  }
});

const PlayersOnTeam = require("./models/PlayersOnTeam.js");

app.get('/api/playersonteam/:teamName', async (req, res) => {

  
  const teamName = req.params.teamName.slice(1);



  try {

    let playersOnTeam = [];
    const lastUpdateThreshold = 24 * 60 * 60 * 1000;

    let team = await PlayersOnTeam.findOne ({teamName: teamName});



    if (team && team.Players && new Date() - team.lastUpdated < lastUpdateThreshold){
      for (let i=0; i < team.Players.length; i ++){
        playersOnTeam.push({
          playerName: team.Players[i].playerName,
          playerLastName: team.Players[i].playerLastName,
          playerId: team.Players[i].playerId
        })
      }
      return res.json (playersOnTeam);
    
    }

    team = await PlayersOnTeam.create ({teamName: teamName, Players: [], lastUpdated: new Date() });



    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentYear = currentDate.getFullYear();
    const currentDateFinal = `${currentYear}-${currentMonth}-${currentDay}`;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneWeekAgoMonth = String(oneWeekAgo.getMonth() + 1).padStart(2, '0');
    const oneWeekAgoDay = String(oneWeekAgo.getDate()).padStart(2, '0');
    const oneWeekAgoYear = oneWeekAgo.getFullYear();
    const oneWeekAgoFinal = `${oneWeekAgoYear}-${oneWeekAgoMonth}-${oneWeekAgoDay}`;

    const firstResponse = await axios.get(`https://www.balldontlie.io/api/v1/stats?per_page=100&start_date=${oneWeekAgoFinal}&end_date=${currentDateFinal}`);
    const totalPages = firstResponse.data.meta.total_pages;
    

    for (let page = 1; page <= totalPages; page++) {
      const currentResponse = await axios.get(`https://www.balldontlie.io/api/v1/stats?per_page=100&start_date=${oneWeekAgoFinal}&end_date=${currentDateFinal}&page=${page}`);
      const currentData = currentResponse.data.data;


      currentData.forEach(item => {

        if (item.team.full_name === teamName) {
          const playerSeenAlready = playersOnTeam.find(player => player.playerId === item.player.id);
          if (!playerSeenAlready) {
            playersOnTeam.push({
              playerName: item.player.first_name,
              playerLastName: item.player.last_name,
              playerId: item.player.id
            })
          }
        }
      })

    }


    await PlayersOnTeam.findOneAndUpdate({ teamName: teamName }, {teamName: teamName, Players: playersOnTeam, lastUpdated: new Date() });

    res.json(playersOnTeam);






  } catch (error) {
    console.error('Error fetching team players: ', error);
    res.status(500).json({ message: 'Error fetching team players ' });
  }




})


const TeamPlayerStat = require("./models/TeamPlayerStat.js");

app.post('/api/teamplayer', async (req, res) => {
  const { playerNames, playerLastNames, playerIDs } = req.body;

  try {
    const lastUpdateThreshold = 24 * 60 * 60 * 1000;
    let teamPlayerData = [];

    const Stats = await TeamPlayerStat.find({
      $and: [
        {Name: { $in: playerNames }},
        {LastName: {$in: playerLastNames}}
      ] 
    });

    const lastStat = await TeamPlayerStat.findOne({
        Name: { $in: playerNames },
        LastName: {$in: playerLastNames}
    }).sort({ lastUpdated: -1 });

    if (lastStat && new Date() - lastStat.lastUpdated < lastUpdateThreshold) {
      for (let i = 0; i < 18; i++) {
        const playerData = Stats[i];

        if (playerData) {
          teamPlayerData.push({
            Name: playerData.Name,
            LastName: playerData.LastName,
            Gp: playerData.Gp,
            Min: playerData.Min,
            Pts: playerData.Pts,
            Reb: playerData.Reb,
            Ast: playerData.Ast,
            Stl: playerData.Stl,
            Blk: playerData.Blk,
            To: playerData.To,
            Pf: playerData.Pf,
            lastUpdated: playerData.lastUpdated
          });
        }

      }
      return res.json(teamPlayerData);
    }
    const response = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerIDs[0]}&player_ids[]=${playerIDs[1]}&player_ids[]=${playerIDs[2]}&player_ids[]=${playerIDs[3]}&player_ids[]=${playerIDs[4]}&player_ids[]=${playerIDs[5]}&player_ids[]=${playerIDs[6]}&player_ids[]=${playerIDs[7]}&player_ids[]=${playerIDs[8]}&player_ids[]=${playerIDs[9]}&player_ids[]=${playerIDs[10]}&player_ids[]=${playerIDs[11]}&player_ids[]=${playerIDs[12]}&player_ids[]=${playerIDs[13]}&player_ids[]=${playerIDs[14]}&player_ids[]=${playerIDs[15]}&player_ids[]=${playerIDs[16]}&player_ids[]=${playerIDs[17]}`);

    for (let i = 0; i < 18; i++) {
      for (let j = 0; j < response.data.data.length; j++) {
        console.log ("hello");
        if (String(playerIDs[i]) === String(response.data.data[j].player_id)) {
          console.log ("loop entered");
          teamPlayerData.push({
            Name: playerNames[i],
            LastName: playerLastNames[i],
            Gp: response.data.data[j].games_played,
            Min: response.data.data[j].min,
            Pts: response.data.data[j].pts,
            Reb: response.data.data[j].reb,
            Ast: response.data.data[j].ast,
            Stl: response.data.data[j].stl,
            Blk: response.data.data[j].blk,
            To: response.data.data[j].turnover,
            Pf: response.data.data[j].pf,
            lastUpdated: new Date()
          })
        }
      }
    }

    await TeamPlayerStat.deleteMany({ 
      $and: [
        {Name: { $in: playerNames }},
        {LastName: {$in: playerLastNames}}
      ] 
    });
    await TeamPlayerStat.insertMany(teamPlayerData);
    
    

    res.json(teamPlayerData);


  } catch (error) {
    console.error('Error fetching player stats: ', error);
    res.status(500).json({ message: 'Error fetching player stats ' });
  }
})


module.exports = app
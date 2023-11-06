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


module.exports = app
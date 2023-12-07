import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'
const Home = props => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        const fetchPlayers = async () => {
            const result = await axios.get('http://142.93.185.177:8080/');
            setPlayers(result.data.players);
        };
        fetchPlayers();
    }, []);
    useEffect(() => {
        const fetchTeams = async () => {
            const result = await axios.get('http://142.93.185.177:8080/');
            setTeams(result.data.teams);
        };
        fetchTeams();
    }, []);
    return (
        <div className="Home">
            <div className='introduction'>
                <h2>Welcome to BBall Player Tracker!</h2>
                <p >
                    This is a website which allows you to access basketball statistics from current NBA games as well as an archive of past statistics. Statistics will be up-to-date and presented in a visually satisfying manner, and you will be able to customize their experience by choosing your favorite players or team.</p>
            </div>
            <div className="top-players-container">
                <div className="players-list">
                    <h3>Top Players</h3>
                    <ul>
                        {players.map((player, index) => (
                            <li key={index}>
                                <Link to={`player-stats/${player.first_name} ${player.last_name}`} className="player">
                                    <span className="player-name">{player.first_name} {player.last_name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="players-list">
                    <h3>Top Teams</h3>
                    <ul>
                        {teams.map((team, index) => (
                            <li key={index}>
                                <Link to={`team-stats/${team.full_name}`} className="player">
                                    <span className="player-name">{team.full_name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}
export default Home
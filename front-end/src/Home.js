import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'
const Home = props => {
    const [players, setPlayers] = useState([]);
    const [games, setGames] = useState([]);
    useEffect(() => {
        const fetchPlayers = async () => {
            const result = await axios.get('https://my.api.mockaroo.com/players.json?key=9baa9be0');
            setPlayers(result.data);
        };
        fetchPlayers();
    }, []);
    useEffect(() => {
        const fetchGames = async () => {
            const result = await axios.get('https://my.api.mockaroo.com/games.json?key=9baa9be0');
            setGames(result.data);
        };
        fetchGames();
    }, []);
    return (
        <div className="Home">
            <h2>Welcome to BBall Player Tracker!</h2>
            <p className='introduction'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Egestas dui id ornare arcu odio ut. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Posuere morbi leo urna molestie at elementum eu facilisis sed. Dolor morbi non arcu risus quis varius. Arcu odio ut sem nulla pharetra diam. Sociis natoque penatibus et magnis dis parturient montes.</p>
            <div className="top-players-container">
                <div className="players-list">
                    <h3>Top Players</h3>
                    <ul>
                        {players.map((player, index) => (
                            <li key={index}>
                                <Link to="player-stats" className="player">
                                    <span className="player-name">{player.first_name} {player.last_name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="players-list">
                    <h3>Top Games this Season</h3>
                    <ul>
                        {games.map((game, index) => (
                            <li key={index} className="player">
                                    <span className="player-name">{game.team1} {game.point1} : {game.point2} {game.team2}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}
export default Home
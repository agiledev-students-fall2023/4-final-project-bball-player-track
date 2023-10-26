import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
const Home = props => {
    return (
        <div className="Home">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png"
                alt=""
                width="200"
                height="200"
            />
            <div className="top-players-container">
                <div className="players-list">
                    <div className="header">Top Players</div>
                    <ul>
                        <li><Link to="playerStats" className="player">Player 1</Link></li>
                        <li><Link to="playerStats" className="player">Player 2</Link></li>
                        <li><Link to="playerStats" className="player">Player 3</Link></li>
                        <li><Link to="playerStats" className="player">Player 4</Link></li>
                        <li><Link to="playerStats" className="player">Player 5</Link></li>
                    </ul>
                </div>
                <div className="player-stats">
                    <div className="header">Top Player Stats Table</div>

                </div>
            </div>

        </div>
    );
}
export default Home
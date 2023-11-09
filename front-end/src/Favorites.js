import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Favorites.css';


const FavoritesPage = () => {
    const [playerStats, setPlayerStats] = useState([]);

    useEffect(() => {
        const fetchRandomPlayerStats = async () => {
            try {
                // Update the URL to the endpoint of your backend service that fetches the stats
                const response = await axios.get('http://localhost:3000/favorites');
                setPlayerStats(response.data);
            } catch (error) {
                console.error('Error fetching random player stats:', error);
                // Handle error or set some default state
            }
        };

        fetchRandomPlayerStats();
    }, []);

    return (
        <div className="teamStats">
            {/* Header and rest of the code remains the same */}

            <h2>Player Stats</h2>
            {/* Player Stats Table */}
            <table>
                <thead>
                <tr>
                    <th class="tooltip">NAME
                        <span class="tooltiptext">Player Name</span>
                    </th>
                    <th class="tooltip">GP
                        <span class="tooltiptext">Games Played</span>
                    </th>
                    <th class="tooltip">MIN
                        <span class="tooltiptext">Minutes Per Game</span>
                    </th>
                    <th class="tooltip">PTS
                        <span class="tooltiptext">Points Per Game</span>
                    </th>
                    <th class="tooltip">OR
                        <span class="tooltiptext">Offensive Rebounds Per Game</span>
                    </th>
                    <th class="tooltip">DR
                        <span class="tooltiptext">Defensive Rebounds Per Game</span>
                    </th>
                    <th class="tooltip">REB
                        <span class="tooltiptext">Total Rebounds Per Game</span>
                    </th>
                    <th class="tooltip">AST
                        <span class="tooltiptext">Assists Per Game</span>
                    </th>
                    <th class="tooltip">STL
                        <span class="tooltiptext">Steals Per Game</span>
                    </th>
                    <th class="tooltip">BLK
                        <span class="tooltiptext">Blocks Per Game</span>
                    </th>
                    <th class="tooltip">TO
                        <span class="tooltiptext">Turnovers Per Game</span>
                    </th>
                    <th class="tooltip">PF
                        <span class="tooltiptext">Personal Fouls Per Game</span>
                    </th>
                </tr>


                </thead>
                <tbody>
                    {playerStats.length > 0 ? (
                        playerStats.map((player, index) => (
                            <tr key={index}>
                                <td>{player.player.first_name} {player.player.last_name}</td>
                                <td>{player.game.date}</td>
                                <td>{player.min}</td>
                                <td>{player.pts}</td>
                                <td>{player.oreb}</td>
                                <td>{player.dreb}</td>
                                <td>{player.reb}</td>
                                <td>{player.ast}</td>
                                <td>{player.stl}</td>
                                <td>{player.blk}</td>
                                <td>{player.turnover}</td>
                                <td>{player.pf}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="14">Loading player stats...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default FavoritesPage;
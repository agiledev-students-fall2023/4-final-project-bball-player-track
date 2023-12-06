import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Players.css';
import { Link } from 'react-router-dom';
const Players = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (forceRefresh = false) => {
        setIsLoading(true);
        try {
            const result = await axios.get(`http://localhost:8080/api/players/stats${forceRefresh ? '?forceRefresh=true' : ''}`);
            const sortedData = result.data.sort((a, b) => parseFloat(b.ppg) - parseFloat(a.ppg));
            setData(sortedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => {
        fetchData(true);
    };

    return (
        <div className="players">
            <h2>Top Players of the League</h2>
            <button onClick={handleRefresh} disabled={isLoading}>
                Refresh Data
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Points Per Game</th>
                        <th>Assists Per Game</th>
                        <th>Steals Per Game</th>
                        <th>Rebounds Per Game</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((player, index) => (
                            <tr key={index}>
                                <td>
                                <Link to={`/player-stats/${player.fullName}`}>
                                    {player.fullName}
                                </Link>   
                                </td>
                                <td>{player.ppg}</td>
                                <td>{player.apg}</td>
                                <td>{player.spg}</td>
                                <td>{player.rpg}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Players;
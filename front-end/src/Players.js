import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Players.css';

const Players = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:8080/api/players/stats');
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className="players">
            <h2>NBA Players - Top Performers</h2>
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
                    {data.map((player, index) => (
                        <tr key={index}>
                            <td>{player.fullName}</td>
                            <td>{player.ppg}</td>
                            <td>{player.apg}</td>
                            <td>{player.spg}</td>
                            <td>{player.rpg}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Players;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Players.css'; 

const Players = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://my.api.mockaroo.com/players.json?key=171b3220');
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className="players">
            <h2>NBA Players</h2>
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
                            <td>{player["[Players]"]}</td>
                            <td>{player["[Points Per Game]"]}</td>
                            <td>{player["[Assists Per Game]"]}</td>
                            <td>{player["[Steals Per Game]"]}</td>
                            <td>{player["[Rebounds Per Game]"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Players;

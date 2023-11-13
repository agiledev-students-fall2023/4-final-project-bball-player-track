import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Teams.css';

const Teams = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:8080/api/teams/stats');
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className="teams">
            <h2>NBA Teams Statistics</h2>
            <table>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((teamStat, index) => (
                        <tr key={index}>
                            <td><Link to={`/team-stats/${teamStat.full_name}`}>{teamStat.full_name}</Link></td>
                            <td>{teamStat.wins}</td>
                            <td>{teamStat.losses}</td>
                            {/* Render more statistics as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Teams;

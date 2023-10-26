import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Teams.css';

const Teams = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://my.api.mockaroo.com/AllTeams.json?key=171b3220');
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className="teams">
            <h2>NBA Teams</h2>
            <table>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((team, index) => (
                        <tr key={index}>
                            {/* Updated Link to just point to "/team-stats" */}
                            <td><Link to="/team-stats">{team["[Teams]"]}</Link></td>
                            <td>{team["[Wins]"]}</td>
                            <td>{team["[Losses]"]}</td>
                            <td>{team["[Points]"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Teams;

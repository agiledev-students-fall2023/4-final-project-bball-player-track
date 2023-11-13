import './TeamStats.css'
import { useParams } from 'react-router-dom';

import './Favorites.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const TeamStats = () => {

    const {teamid} = useParams()

    const [playerdata, setData] = useState([]);
    
    useEffect(() => {
    const fetchData = async () => {
    const result = await axios.get('https://my.api.mockaroo.com/teamplayers.json?key=8e50b960');
    setData(result.data);
    };
    fetchData();
    }, [teamid]);





    return (
        <div className="teamStats">
            

            
            
            <h2>{teamid}</h2>
            
{/*
            <img
            src="https://picsum.photos/200/300"
            alt=" "
            width="100"
            height="100"
            />
*/}

            <table>
                <thead>
                    <tr>
                        <th>PTS</th>
                        <th>OR</th>
                        <th>DR</th>
                        <th>REB</th>
                        <th>AST</th>
                        <th>STL</th>
                        <th>BLK</th>
                        <th>TO</th>
                        <th>PF</th>
                        <th>AST/TO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>18.5</td>
                        <td>1.2</td>
                        <td>5.7</td>
                        <td>4.3</td>
                        <td>6.2</td>
                        <td>1.1</td>
                        <td>0.9</td>
                        <td>2.4</td>
                        <td>3.1</td>
                        <td>2.5</td>
                    </tr>
                </tbody>
            </table>

            <h2>Player Stats</h2>
                <table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>GP</th>
                            <th>GS</th>
                            <th>MIN</th>
                            <th>PTS</th>
                            <th>OR</th>
                            <th>DR</th>
                            <th>REB</th>
                            <th>AST</th>
                            <th>STL</th>
                            <th>BLK</th>
                            <th>TO</th>
                            <th>PF</th>
                            <th>AST/TO</th>
                        </tr>
                    </thead>
                    <tbody>
                    {playerdata.map((player, index) => (
                        <tr key={index}>
                            <td>
                            <Link to={`/player-stats`}>
                                    {player["[Name]"]}
                            </Link>
                            </td>
                            <td>{player["[Gp]"]}</td>
                            <td>{player["[Gs]"]}</td>
                            <td>{player["[Min]"]}</td>
                            <td>{player["[Pts]"]}</td>
                            <td>{player["[Or]"]}</td>
                            <td>{player["[Dr]"]}</td>
                            <td>{player["[Reb]"]}</td>
                            <td>{player["[Ast]"]}</td>
                            <td>{player["[Stl]"]}</td>
                            <td>{player["[Blk]"]}</td>
                            <td>{player["[To]"]}</td>
                            <td>{player["[Pf]"]}</td>
                            <td>{player["[Ast/To]"]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>



            
        
        </div>
    );
}

export default TeamStats;
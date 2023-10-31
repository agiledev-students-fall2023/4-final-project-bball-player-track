import './PlayerStats.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const PlayerStats = () => {
    const [gamedata, setData] = useState([]);
    
    useEffect(() => {
    const fetchData = async () => {
    const result = await axios.get('https://my.api.mockaroo.com/PlayerStatsGame.json?key=8e50b960');
    setData(result.data);
    };
    fetchData();
    }, []);

    const [seasondata, setData2] = useState([]);
    
    useEffect(() => {
    const fetchData = async () => {
    const result = await axios.get('https://my.api.mockaroo.com/playerStatsSeason.json?key=8e50b960');
    setData2(result.data);
    };
    fetchData();
    }, []);






    return (
        <div className="playerStats">
            


            
            
            <h2>Player Name Here</h2>
            

            <img
            src="https://picsum.photos/200/300"
            alt=" "
            width="100"
            height="100"
            />
            


            <h2>Stats by Game</h2>
                <table>
                    <thead>
                        <tr>
                            <th>GAME</th>
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
                    {gamedata.map((game, index) => (
                        <tr key={index}>
                            <td>
                            <Link to={`/team-stats`}>
                                    {game["[Game]"]}
                            </Link>
                            </td>
                            <td>{game["[Min]"]}</td>
                            <td>{game["[Pts]"]}</td>
                            <td>{game["[Or]"]}</td>
                            <td>{game["[Dr]"]}</td>
                            <td>{game["[Reb]"]}</td>
                            <td>{game["[Ast]"]}</td>
                            <td>{game["[Stl]"]}</td>
                            <td>{game["[Blk]"]}</td>
                            <td>{game["[To]"]}</td>
                            <td>{game["[Pf]"]}</td>
                            <td>{game["[Ast/To]"]}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>

            <h2>Stats by Season </h2>
                <table>
                    <thead>
                        <tr>
                            <th>SEASON</th>
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
                    {seasondata.map((season, index) => (
                        <tr key={index}>
                            <td>{season["[Season]"]}</td>
                            <td>{season["[Gp]"]}</td>
                            <td>{season["[Gs]"]}</td>
                            <td>{season["[Min]"]}</td>
                            <td>{season["[Pts]"]}</td>
                            <td>{season["[Or]"]}</td>
                            <td>{season["[Dr]"]}</td>
                            <td>{season["[Reb]"]}</td>
                            <td>{season["[Ast]"]}</td>
                            <td>{season["[Stl]"]}</td>
                            <td>{season["[Blk]"]}</td>
                            <td>{season["[To]"]}</td>
                            <td>{season["[Pf]"]}</td>
                            <td>{season["[Ast/To]"]}</td>

                        </tr>
                    ))}

                    </tbody>
                </table>



            
        
        </div>
    );
}
export default PlayerStats;

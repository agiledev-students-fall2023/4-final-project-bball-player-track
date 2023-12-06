import './PlayerStats.css'
import { useParams } from 'react-router-dom';


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const PlayerStats = () => {
    const {PlayerName} = useParams()
    const [firstName, lastName] = PlayerName.split(' ');

    console.log (PlayerName);
    const [stats, setPlayerStats] = useState([]);
    
    useEffect(() => {
    const fetchPlayerStats = async () => {
        const firstresult = await axios.get(`http://localhost:8080/api/playerstatsbyseason/:${encodeURIComponent(PlayerName)}`);
        



        setPlayerStats(firstresult.data);
        };
    fetchPlayerStats();
    }, [PlayerName]);









    return (
        <div className="playerStats">
            


            
            
            <h2>{firstName + " " + lastName}</h2>
            

{/*
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
                    */}


            <h2>Stats by Season </h2>
                <table>
                    <thead>
                        <tr>
                            <th>SEASON</th>
                            <th>GP</th>
                            <th>MIN</th>
                            <th>PTS</th>
                            <th>REB</th>
                            <th>AST</th>
                            <th>STL</th>
                            <th>BLK</th>
                            <th>TO</th>
                            <th>PF</th>
                        </tr>
                    </thead>
                    <tbody>
                    {stats.map((season, index) => (
                        <tr key={index}>
                            <td>{season.Season}</td>
                            <td>{season.Gp}</td>
                            <td>{season.Min}</td>
                            <td>{season.Pts}</td>
                            <td>{season.Reb}</td>
                            <td>{season.Ast}</td>
                            <td>{season.Stl}</td>
                            <td>{season.Blk}</td>
                            <td>{season.To}</td>
                            <td>{season.Pf}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>



            
        
        </div>
    );
}
export default PlayerStats;

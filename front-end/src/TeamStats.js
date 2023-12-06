import './TeamStats.css';
import { useParams } from 'react-router-dom';


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const TeamStats = () => {

    const {teamid} = useParams()

    
    const [playerStats, setPlayerStats] = useState([]);
    
    useEffect(() => {
    const fetchPlayerStats = async () => {
        const firstresult = await axios.get(`http://localhost:8080/api/playersonteam/:${teamid}`);
        const playersOnTeam = firstresult.data;
        
        const playerNames = playersOnTeam.map(player => player.playerName);
        
        const playerLastNames = playersOnTeam.map(player => player.playerLastName);
        const playerIds = playersOnTeam.map(player => player.playerId);
        const playerStatResult = await axios.post('http://localhost:8080/api/teamplayer',{
            playerNames: playerNames,
            playerLastNames: playerLastNames,
            playerIDs: playerIds
        });


        setPlayerStats(playerStatResult.data);
        };
    fetchPlayerStats();
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
{/*
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
*/}
            <h2>Player Stats</h2>
                <table className="playersOnTeamTable">
                    <thead>
                        <tr>
                            <th>NAME</th>
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
                    {playerStats.map((player, index) => (
                        <tr key={index}>
                            <td>
                            <Link to={`/player-stats/${player.Name}%${player.LastName}`}>
                                    {player.Name + " " + player.LastName}
                            </Link>
                            </td>
                            <td>{player.Gp}</td>
                            <td>{player.Min}</td>
                            <td>{player.Pts}</td>
                            <td>{player.Reb}</td>
                            <td>{player.Ast}</td>
                            <td>{player.Stl}</td>
                            <td>{player.Blk}</td>
                            <td>{player.To}</td>
                            <td>{player.Pf}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>



            
        
        </div>
    );
}


export default TeamStats;
import './TeamStats.css'


import './Favorites.css'
import React from 'react';


const TeamStats = () => {
    const samplePlayerData = {
        name: 'Player',
        gp: 20,
        gs: 15,
        min: '30:45',
        pts: 18.5,
        or: 1.2,
        dr: 5.7,
        reb: 4.3,
        ast: 6.2,
        stl: 1.1,
        blk: 0.9,
        to: 2.4,
        pf: 3.1,
        ast_to: 2.5,
    };

    const rows = Array(12).fill(samplePlayerData);




    return (
        <div className="teamStats">
            
            
            <h2>Team Name Here</h2>
            

            <img
            src="https://picsum.photos/200/300"
            alt=" "
            width="100"
            height="100"
            />
            <h2>Team Stats</h2>

            <table>
                <thead>
                    <tr>
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
                    {/* Rows */}
                    {/* Replace the following with your actual player data */}
                    <tr>
                        <td>20</td>
                        <td>15</td>
                        <td>30:45</td>
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
                    {/* Add more rows as needed */}
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
                        {rows.map((player, index) => (
                            <tr key={index}>
                                <td>{player.name}</td>
                                <td>{player.gp}</td>
                                <td>{player.gs}</td>
                                <td>{player.min}</td>
                                <td>{player.pts}</td>
                                <td>{player.or}</td>
                                <td>{player.dr}</td>
                                <td>{player.reb}</td>
                                <td>{player.ast}</td>
                                <td>{player.stl}</td>
                                <td>{player.blk}</td>
                                <td>{player.to}</td>
                                <td>{player.pf}</td>
                                <td>{player.ast_to}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>



            
        
        </div>
    );
}

export default TeamStats;
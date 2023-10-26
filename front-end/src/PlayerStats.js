import './PlayerStats.css'

import React from 'react';


const PlayerStats = () => {
    const sampleSeasonData = {
        name: '2022-23',
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

    const rows = Array(12).fill(sampleSeasonData);

    const sampleGameData ={
        name: 'LAL',
        min: '30:45',
        pts: 18,
        or: 1,
        dr: 5,
        reb: 4,
        ast: 6,
        stl: 1,
        blk: 0,
        to: 2,
        pf: 3,
        ast_to: 2

    }
    const rowsGame = Array(12).fill(sampleGameData);




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
                        {rowsGame.map((game, index) => (
                            <tr key={index}>
                                <td>{game.name}</td>
                                <td>{game.min}</td>
                                <td>{game.pts}</td>
                                <td>{game.or}</td>
                                <td>{game.dr}</td>
                                <td>{game.reb}</td>
                                <td>{game.ast}</td>
                                <td>{game.stl}</td>
                                <td>{game.blk}</td>
                                <td>{game.to}</td>
                                <td>{game.pf}</td>
                                <td>{game.ast_to}</td>
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
                        {rows.map((season, index) => (
                            <tr key={index}>
                                <td>{season.name}</td>
                                <td>{season.gp}</td>
                                <td>{season.gs}</td>
                                <td>{season.min}</td>
                                <td>{season.pts}</td>
                                <td>{season.or}</td>
                                <td>{season.dr}</td>
                                <td>{season.reb}</td>
                                <td>{season.ast}</td>
                                <td>{season.stl}</td>
                                <td>{season.blk}</td>
                                <td>{season.to}</td>
                                <td>{season.pf}</td>
                                <td>{season.ast_to}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>



            
        
        </div>
    );
}
export default PlayerStats;

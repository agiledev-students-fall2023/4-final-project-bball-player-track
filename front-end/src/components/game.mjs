import './Game.css';
import React, {useState} from 'react';
import axios from 'axios';


const Game = (props) => {

    const [data, setData] = useState([]);

    const options = {
        /*
        params: {
        seasons: [2023,2022]
        }*/
    };

    React.useEffect(() => {
        const fetchPlayers = async () => {
            const result = await axios.get('http://localhost:8080/games');
            setData(result.data);
        };
        fetchPlayers();
    }, []);
    
    /*
    React.useEffect(() => {
        async function getData()  {
        const response = await axios.get('https://www.balldontlie.io/api/v1/games',options);
            setData(response.data.data);
        };
        getData();
    }, []);*/


    return(
        <table>
            <thead>
                <tr>
                <th>Date</th>
                <th>Home Team</th>
                <th>Traveling Team</th>
                <th>Home Team Score</th>
                <th>Traveling Team Score</th>
                </tr>
            </thead>
            <tbody>
            {data.map((game,index) => (
                        <tr key={game.id}>
                            <td>{game.date}</td>
                            <td>{game.home_team.full_name}</td>
                            <td>{game.visitor_team.full_name}</td>
                            <td>{game.home_team_score}</td>
                            <td>{game.visitor_team_score}</td>
                        </tr>
                    ))}

            </tbody>

        </table>
    );

}

export default Game;

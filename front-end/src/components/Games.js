import './Games.css'
import {React, useState} from 'react';
import {axios} from 'axios';


const Games = (props) => {

    const [data, setData] = useState();
    
    const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/games/statistics',
        params: {id: '3333'},
        headers: {
          'X-RapidAPI-Key': '706d19fc97msh484bb59607a0b02p140386jsne4af43900676',
          'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
      };
    
    React.useEffect(() => {
        async function getData()  {
        const response = await axios.request(options).then((response) => {
            setData(response);
            });
            console.log(response);
        };
        getData();
    }, []);

    const t2 = 'consectetur adipiscing elit, sed do eiusmod tempor' ;
    const t3 = 'incididunt ut labore et dolore magna aliqua. Ut enim'; 
    const t4 = 'ad minim veniam, quis nostrud exercitation ullamco laboris';

    return(
        <table>
            <tr>
                <th>Home</th>
                <th>Traveling</th>
                <th>Score</th>
            </tr>
            <tr>
                <td>Nuggets</td>
                <td>Trailblazers</td>
                <td>83 - 79</td>

            </tr>
            <tr>
                <td>{t2}</td>
                <td>{t3}</td>
                <td>{t4}</td>
            </tr>

        </table>
    );

}

export default Games;

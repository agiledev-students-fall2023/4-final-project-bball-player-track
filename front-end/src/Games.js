import './Games.css'
import React from 'react';

const Games = (props) => {
    const lorem_ipsum = 'Lorem ipsum dolor sit amet,'; 
    const t2 = 'consectetur adipiscing elit, sed do eiusmod tempor' ;
    const t3 = 'incididunt ut labore et dolore magna aliqua. Ut enim'; 
    const t4 = 'ad minim veniam, quis nostrud exercitation ullamco laboris';
    const t5 = 'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor';

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

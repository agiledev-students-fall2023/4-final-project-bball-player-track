import './GameStats.css'

const GameStats = (props) => {
    const lorem_ipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

    return(
        <table>
            <tr>
                <th>Home</th>
                <th>Traveling</th>
                <th>Score</th>
                <th></th>
            </tr>
            <tbody>
                <td>Nuggets</td>
                <td>Trailblazers</td>
                <td>83 - 79</td>
            </tbody>

        </table>
    );

}

export default GameStats;
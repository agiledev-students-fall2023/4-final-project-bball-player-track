import './Game.css';
import React, {useState} from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';

const GameTable = (props) => {

    const seasons = ["2023-24", "2022-23", "2021-22", "2020-21", "2019-20", "2018-19", "2017-18", "2016-17", 
    "2015-16", "2014-15", "2013-14", "2012-13", "2011-12", "2010-11", "2009-10", "2008-09", "2007-08", 
    "2006-07", "2005-06", "2004-05", "2003-04", "2002-03", "2001-02", "2000-01", "1999-00", "1998-99", 
    "1997-98", "1996-97", "1995-96", "1994-95", "1993-94", "1992-93", "1991-92", "1990-91", "1989-90", 
    "1988-89", "1987-88", "1986-87", "1985-86", "1984-85", "1983-84", "1982-83", "1981-82", "1980-81", 
    "1979-80", "1978-79", "1977-78", "1976-77", "1975-76", "1974-75", "1973-74", "1972-73", "1971-72", 
    "1970-71", "1969-70", "1968-69", "1967-68", "1966-67", "1965-66", "1964-65", "1963-64", "1962-63", 
    "1961-62", "1960-61", "1959-60", "1958-59", "1957-58", "1956-57", "1955-56", "1954-55", "1953-54", 
    "1952-53", "1951-52", "1950-51", "1949-50", "1948-49", "1947-48", "1946-47"];

    const url = 'http://localhost:8080/api/games';
    
    const [data, setData] = useState(null);

    const [season,setSeason] = useState("2023");
    const [page, setPage] = useState(0);

    const [maxPage, setMaxPage] = useState(50);

    const fetchPlayers = async (url) => {
        const response = await axios.get(url,{
            params: {
                season: season.substring(0,4),
            }
        });
        setData(response.data[0]);
        setMaxPage(response.data[1]);

    };
    
    //Populate page on first load
    React.useEffect(() => {
        fetchPlayers(url);
    }, []);

    //run fetchPlayers whenever the search button is clicked to get the proper page/season
    function handleSearch(e) {
        e.preventDefault();
        fetchPlayers(url);
    }

    function changePage(e,val) {
        setPage(val);
    }

    return(
        <>

        <form className = "games-select" onSubmit={handleSearch}> 
            <label>Season:
            <select value = {season} onChange={(e)=> {setSeason(e.target.value)}}>
                {seasons.map((season, index) => (
                    <option key={season.substring(0,4)}>{season}</option>
                ))}
            </select>
            </label>
            <button id = "search" type = "submit">Search</button>

            <Pagination count={maxPage} onChange={changePage}color="primary" />
        </form>

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
            {data && page > 0 && data[page-1].map((game,index) => (
                        <tr className = "games-table" key={game.id}>
                            <td>{game.date}</td>
                            <td>{game.home_team.full_name}</td>
                            <td>{game.visitor_team.full_name}</td>
                            <td>{game.home_team_score}</td>
                            <td>{game.visitor_team_score}</td>
                        </tr>
                    ))}

            </tbody>

        </table>
        </>
    );

}

export default GameTable;

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
const Home = props => {
    return (
        <div className="Home">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>BBall Player Tracker</h1>
            </Link>
            <nav>
                <a href="/players">Players</a>
                <a href="/teams">Teams</a>
                <a href="/games">Games</a>
                <a href="/favorites" className="active">Favorites</a>
            </nav>


        </div>
    );
}
export default Home
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';

const Header = props => {
    return (
        <div className="Header">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>BBall Player Tracker</h1>
            </Link>
            <nav>
                <Link to="/players" className="nav-link">Players</Link>
                <Link to="/teams" className="nav-link">Teams</Link>
                <Link to="/games" className="nav-link">Games</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </nav>
        </div>
    );
}

export default Header;


import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Header.css';

const Header = props => {
    return (
        <div className="Header">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>BBall Player Tracker</h1>
            </Link>
            <nav>
                <Link to="/players">Players</Link>
                <Link to="/teams">Teams</Link>
                <Link to="/games">Games</Link>
                <Link to="/favorites" className="active">Favorites</Link>
            </nav>
        </div>
    );
}

export default Header;

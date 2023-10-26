// Header.js
import React from 'react';
import './Header.css';

const Header = props => {
    return (
        <div className="Header">
            <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>BBall Player Tracker</h1>
            </a>
            <nav>
                <a href="/players">Players</a>
                <a href="/teams">Teams</a>
                <a href="/games">Games</a>
                <a href="/favorites" className="active">Favorites</a>
            </nav>
        </div>
    );
}

export default Header;

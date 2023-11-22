import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';

const Header = props => {
    return (
        <div className="navbar">
            <Link to="/">
                <h1 className='header'>BBall Player Tracker</h1>
            </Link>
            <nav>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png"
                    alt="" />
                <Link to="/players">Players</Link>
                <Link to="/teams">Teams</Link>
                <Link to="/games">Games</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/auth/login" className="login-link">Login</Link>
                <Link to="/auth/signup" className="login-link">Sign up</Link>
            </nav>
        </div>
    );
}

export default Header;


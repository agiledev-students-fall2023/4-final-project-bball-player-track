import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = props => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload();
    };

    return (
        <div className="navbar">
            <Link to="/">
                <h1 className='header'>BBall Player Tracker</h1>
                
            </Link>
            <nav>
                <Link to="/players">Players</Link>
                <Link to="/teams">Teams</Link>
                <Link to="/games">Games</Link>
                <Link to="/favorites">Favorites</Link>
                {token ? (
                    <>
                        <span className="header-username">Hi, {username}</span>
                        <button onClick={handleLogout} className="login-link">Logout</button> 
                    </>
                ) : (
                    <Link to="/auth" className="login-link">Log in/Sign Up</Link>
                )}
            </nav>
        </div>
    );
};

export default Header;

import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} BBall Player Tracker. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="https://www.nba.com" target="_blank" rel="noopener noreferrer">NBA Official Site</a></li>
                    <li><a href="https://www.euroleague.net" target="_blank" rel="noopener noreferrer">EuroLeague Basketball</a></li>
                    <li><a href="https://www.fiba.basketball" target="_blank" rel="noopener noreferrer">FIBA Basketball</a></li>
                    <li><a href="https://www.ncaa.com/sports/basketball-men/d1" target="_blank" rel="noopener noreferrer">NCAA Men's Basketball</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;

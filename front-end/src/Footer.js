import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
    const [feedback, setFeedback] = useState('');

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleFeedbackSubmit = () => {
        console.log(`Feedback submitted: ${feedback}`);
        setFeedback('');
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} BBall Player Tracker. All rights reserved.</p>
                {/* <p>Sites you may find interesting:</p>
                <ul className="footer-links">
                    <li><a href="https://www.nba.com" target="_blank" rel="noopener noreferrer">NBA Official Site</a></li>
                    <li><a href="https://www.euroleague.net" target="_blank" rel="noopener noreferrer">EuroLeague Basketball</a></li>
                    <li><a href="https://www.fiba.basketball" target="_blank" rel="noopener noreferrer">FIBA Basketball</a></li>
                    <li><a href="https://www.ncaa.com/sports/basketball-men/d1" target="_blank" rel="noopener noreferrer">NCAA Men's Basketball</a></li>
                </ul> */}
            </div>
            <div className="footer-feedback">
                <p>Help improve our website!</p>
                <input
                    type="text"
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder="Your feedback"
                />
                <button onClick={handleFeedbackSubmit}>Send</button>
            </div>
        </footer>
    );
};

export default Footer;
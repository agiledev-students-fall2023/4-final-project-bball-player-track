import React, { useState } from 'react';
import './Footer.css'; // Make sure this points to the correct CSS file

const Footer = () => {
    const [feedback, setFeedback] = useState('');

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleFeedbackSubmit = () => {
        // Implement the logic to send feedback here
        console.log(`Feedback submitted: ${feedback}`);
        setFeedback(''); // Clear the input after submission
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} BBall Player Tracker. All rights reserved.</p>
                <div className="footer-links">
                    <p>Sites you may find interesting:</p>
                    <a href="https://www.nba.com">NBA Official Site</a>
                    <a href="https://www.euroleague.net">EuroLeague Basketball</a>
                    <a href="https://www.fiba.basketball">FIBA Basketball</a>
                    <a href="https://www.ncaa.com/sports/basketball-men/d1">NCAA Men's Basketball</a>
                </div>
            </div>
            <div className="footer-feedback">
                <input 
                    type="text" 
                    value={feedback} 
                    onChange={handleFeedbackChange} 
                    placeholder="Help improve our website"
                />
                <button onClick={handleFeedbackSubmit}>Send</button>
            </div>
        </footer>
    );
};

export default Footer;

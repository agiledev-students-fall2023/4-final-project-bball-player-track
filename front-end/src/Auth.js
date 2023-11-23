import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'
const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error, please try again');
        }

    };

    return (
        <div className="login-container">

            <form className="login-form" onSubmit={handleSubmit}>
                Welcome to BBall Player Tracker!
                <input
                    className="login-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    className="login-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <button className="login-button" type="submit">Log in / Sign up</button>
            </form>
        </div>
    );
}

export default Auth;

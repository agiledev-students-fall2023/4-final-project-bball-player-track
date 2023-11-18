// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Implement your authentication logic here
        // For example, check for an existing auth token in localStorage,
        // and validate it (possibly by sending a request to your backend)

        // This is just a placeholder logic
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
            // Optionally, decode the token to get user data or fetch user data from API
            // setUser(decodedUserData);
        }
    }, []);

    const login = (userData, token) => {
        // Set the user data and authentication status
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('authToken', token); // Store the auth token
    };

    const logout = () => {
        // Clear user data and authentication status
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('authToken'); // Remove the auth token
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

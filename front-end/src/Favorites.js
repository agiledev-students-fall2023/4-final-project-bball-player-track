import './Favorites.css'
import React from 'react';


const FavoritesPage = () => {
    return (
        <div className="favoritesPage">
            {/* Header */}
                <h1>BBall Player Tracker</h1>
                <nav>
                    <a href="/players">Players</a>
                    <a href="/teams">Teams</a>
                    <a href="/games">Games</a>
                    <a href="/favorites" className="active">Favorites</a>
                </nav>
            
            {/* Page Title */}
            <h2>Favorites</h2>
            
            {/* Login Section */}
            <section className="loginSection">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button>Login</button>
            </section>
            
            {/* Table */}
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                        <th>Rebound</th>
                        <th>Assist</th>
                    </tr>
                </thead>
                <tbody>
                    {Array(12).fill().map((_, index) => (
                        <tr key={index}>
                            <td>Player</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
        </div>
    );
}


export default FavoritesPage;

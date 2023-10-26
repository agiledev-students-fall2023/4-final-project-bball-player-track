import './Favorites.css'
import React from 'react'
import { Link } from 'react-router-dom';


const FavoritesPage = () => {
    return (
        <div className="favoritesPage">
            
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
                            <td>
                            <Link to={`/player-stats`}>
                                    {"Player"}
                            </Link>
                            </td>
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

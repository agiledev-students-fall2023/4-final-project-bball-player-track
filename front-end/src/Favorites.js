import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import './Favorites.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [combinedFavorites, setCombinedFavorites] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); 
    const [playersPerPage, setPlayersPerPage] = useState(10); 
    const [totalPages, setTotalPages] = useState(0); 
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && window.location.pathname !== '/auth') {
            alert('Please log in to access your favorites.');
            navigate('/auth');
        }
    }, [navigate]);


    useEffect(() => {

        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.id);
        }
    }, []);


    const fetchPlayerStats = async (playerId) => {
        try {
            const response = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`);
            return response.data.data[0];
        } catch (error) {
            console.error('Error fetching player stats:', error);
            return null; 
        }
    };

    const searchPlayers = async (page = 1) => {
        if (!searchTerm.trim()) {
            setShowDropdown(false);
            return;
        }

        setLoading(true);
        setCurrentPage(page);
        try {
            const response = await axios.get(`https://www.balldontlie.io/api/v1/players`, {
                params: {
                    search: searchTerm,
                    page: page,
                    per_page: playersPerPage
                }
            });
            const totalPlayers = response.data.meta.total_count; 
            setTotalPages(Math.ceil(totalPlayers / playersPerPage)); 

            const searchResults = await Promise.all(response.data.data.map(async player => {
                const stats = await fetchPlayerStats(player.id);
                return { ...player, stats };
            }));

            const sortedResults = searchResults.filter(player => player.stats)
                .concat(searchResults.filter(player => !player.stats));

            setPlayers(sortedResults);
            setShowDropdown(true);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
        setLoading(false);
    };


    const renderPagination = () => {
        return (
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
                        onClick={() => searchPlayers(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        );
    };


    const addFavorite = async (playerId) => {
        try {
            const response = await axios.post(`http://localhost:8080/user/${userId}/addFavorite`, { playerId });
            if (response.status === 200) {
                console.log('Player added to favorites');
                alert('Player added to favorites');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Error adding favorite:', error.response.data);
                alert(error.response.data); 
            } else {
                console.error('Error adding favorite:', error);
                alert('An error occurred while adding the player to favorites');
            }
        }
    };


    const removeFavorite = async (playerId) => {
        try {
            await axios.delete(`http://localhost:8080/user/${userId}/removeFavorite`, { data: { playerId } });
            fetchFavorites(); // Refresh favorites after removing
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    const fetchFavorites = async () => {
        if (userId) {
            try {
                const response = await axios.get(`http://localhost:8080/user/${userId}/favorites`);
                const favoritePlayerIds = response.data;
                // Fetch player details and stats
                const playerDetails = await Promise.all(favoritePlayerIds.map(playerId =>
                    axios.get(`https://www.balldontlie.io/api/v1/players/${playerId}`)));
                const playerStats = await Promise.all(favoritePlayerIds.map(playerId =>
                    axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`)));

                const fetchedFavorites = playerDetails.map((detail, index) => ({
                    id: detail.data.id,
                    name: `${detail.data.first_name} ${detail.data.last_name}`,
                    stats: playerStats[index].data.data[0]
                }));

                setCombinedFavorites(fetchedFavorites);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        }
    };



    useEffect(() => {
        fetchFavorites();
    }, [userId]);

    return (
        <div>
            <h3 className="favorite-title">My Favorites</h3>

            <table className="table-players">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Points Per Game</th>
                        <th>Assists Per Game</th>
                        <th>Steals Per Game</th>
                        <th>Rebounds Per Game</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {combinedFavorites.map((player, index) => (
                        <tr key={index}>
                            <td>
                            <Link to={`/player-stats/${player.name}`}>
                                    {player.name}
                            </Link>
                            </td>
                            <td>{player.stats?.pts || 'N/A'}</td>
                            <td>{player.stats?.ast || 'N/A'}</td>
                            <td>{player.stats?.stl || 'N/A'}</td>
                            <td>{player.stats?.reb || 'N/A'}</td>
                            <td>
                                <button className="delete-button" onClick={() => removeFavorite(player.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3 className="favorite-title">Add new players</h3>

            <div className="search-box">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter player name"
                />
                <button className="refresh-button" onClick={searchPlayers} disabled={loading}>Search</button>
                <button className="refresh-button" onClick={fetchFavorites}>Refresh</button>

            </div>



            {showDropdown && (
                <div className="search-results">
                    <table className="table-players">
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Points Per Game</th>
                                <th>Assists Per Game</th>
                                <th>Steals Per Game</th>
                                <th>Rebounds Per Game</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player, index) => (
                                <tr key={`player-${player.id}-${index}`}>
                                    <td>{player.first_name} {player.last_name}</td>
                                    <td>{player.stats?.pts || 'N/A'}</td>
                                    <td>{player.stats?.ast || 'N/A'}</td>
                                    <td>{player.stats?.stl || 'N/A'}</td>
                                    <td>{player.stats?.reb || 'N/A'}</td>
                                    <td>
                                        <button className="add-button" onClick={() => addFavorite(player.id)}>
                                            Add
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}
            {showDropdown && players.length > 0 && renderPagination()}





        </div>
    );
};

export default FavoritesPage;

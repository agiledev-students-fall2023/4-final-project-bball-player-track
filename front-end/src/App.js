// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import FavoritesPage from './Favorites';
import TeamStats from './TeamStats';
import Home from './Home';
import Header from './Header';
import Teams from './Teams'; // Import the Teams component

const App = props => {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App-main">
          <Routes>
            {/* a route to see the favorites */}
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/team-stats" element={<TeamStats />} />
            <Route path="/teams" element={<Teams />} /> {/* Add a new route for Teams */}
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App;

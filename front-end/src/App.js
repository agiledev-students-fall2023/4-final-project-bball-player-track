import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import FavoritesPage from './Favorites';
import TeamStats from './TeamStats';
import Home from './Home';
import Header from './Header';
import PlayerStats from './PlayerStats';
//import Players from './Players';
/*add import */
import Teams from './Teams'; // Import the Teams component
import Players from './Players'; // Import the Players component
import GameTable from './components/GameTable.js';
import Auth from './Auth';
import Footer from './Footer';

const App = props => {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/team-stats" element={<TeamStats />} />
            <Route path="/player-stats" element={<PlayerStats />} />
            <Route path="/team-stats/:teamid" element={<TeamStats />} />
            <Route path="/player-stats/:PlayerName" element={<PlayerStats />} />
            <Route path = "/games" element = {<GameTable/>}/>
            <Route path="/teams" element={<Teams />} /> {/* Route for Teams */}
            <Route path="/players" element={<Players />} /> {/* Route for Players */}
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Favorites from './Favorites';

import Players from './Players';
/*add import */

const App = props => {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App-main">
          <Routes>
            {/* a route for the home page */}
            <Route path="/" element={<Home />} />

            {/* a route to see the players */}
            <Route path="/players" element={<Players />} />

            {/* a route to see the player stats */}
            <Route path="/players/:playerId" element={<PlayerStats />} />

            {/* a route to see the teams */}
            <Route path="/teams" element={<Teams />} />

            {/* a route to see the team stats */}
            <Route path="/teams/:teamId" element={<TeamStats />} />

            {/* a route to see the games */}
            <Route path="/games" element={<Games />} />

            {/* a route to see the game stats */}
            <Route path="/games/:gameId" element={<GameStats />} />

            {/* a route to see the favorites */}
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
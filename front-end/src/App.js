import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import FavoritesPage from './Favorites';
import TeamStats from './TeamStats'
import Home from './Home';
import Header from './Header';
//import Players from './Players';
/*add import */

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
            <Route path="/TeamStats" element={<TeamStats />} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
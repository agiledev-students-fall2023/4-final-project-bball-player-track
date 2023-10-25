import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import FavoritesPage from './Favorites';
import TeamStats from './TeamStats'
//import Players from './Players';
/*add import */

const App = props => {
  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
                {/* a route to see the favorites */}
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/TeamStats" element={<TeamStats />} /> 
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Favorites from './Favorites';

import Players from './Players';
/*add import */

const App = props => {
  return (
    <div className="App">
      <Router>
        <main className="App-main">
          <Routes>
                {/* a route to see the favorites */}
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import ExperiencePage from './pages/ExperiencePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/experience/:id" element={<ExperiencePage />} />
        {/* acepta IDs directos */}
        <Route path="/:id" element={<WelcomePage />} />
      </Routes>
    </Router>
  )
}

export default App



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BuilderPage from './pages/BuilderPage'
import DashboardPage from './pages/DashboardPage'
import InvitationView from './pages/InvitationView'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuilderPage />} />
        <Route path="/dashboard/:eventId" element={<DashboardPage />} />
        <Route path="/invite/:guestId" element={<InvitationView />} />
      </Routes>
    </Router>
  )
}

export default App

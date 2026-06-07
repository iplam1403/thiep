import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BuilderPage from './pages/BuilderPage'
import DashboardPage from './pages/DashboardPage'
import InvitationView from './pages/InvitationView'
import AuthPage from './pages/AuthPage'
import HistoryPage from './pages/HistoryPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuilderPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/dashboard/:eventId" element={<DashboardPage />} />
        <Route path="/invite/:guestId" element={<InvitationView />} />
      </Routes>
    </Router>
  )
}

export default App

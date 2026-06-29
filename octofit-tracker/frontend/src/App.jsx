import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <main className="container py-4">
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h1 className="display-6 fw-bold mb-2">OctoFit Tracker</h1>
          <p className="text-muted mb-3">
            A multi-tier fitness experience powered by the Express API and a React 19 frontend.
          </p>
          <div className="alert alert-info small mb-0">
            Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> for Codespaces URLs, or leave it unset to use localhost.
          </div>
        </div>
      </div>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  );
}

export default App;

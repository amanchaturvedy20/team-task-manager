import './Layout.css';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const Layout = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="container flex-between">
          <Link to="/" className="logo">
            📋 Task Manager
          </Link>
          <nav className="nav">
            <Link to="/projects">Projects</Link>
            <Link to="/dashboard">Dashboard</Link>
            {isAdmin && <Link to="/admin" className="admin-link">🛡️ Admin Panel</Link>}
            <div className="user-menu">
              <span className="user-name">
                {user?.firstName} {user?.lastName}
                <span className={`role-badge-nav ${isAdmin ? 'role-admin' : 'role-member'}`}>
                  {user?.role}
                </span>
              </span>
              <button onClick={handleLogout} className="btn btn-logout">
                Logout
              </button>
            </div>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <div className="container">{children}</div>
      </main>
    </div>
  );
};

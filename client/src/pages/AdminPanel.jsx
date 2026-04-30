import { useState, useEffect } from 'react';
import { adminAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

export const AdminPanel = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    loadData();
  }, [isAdmin]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersRes, statsRes] = await Promise.all([
        adminAPI.getUsers(),
        adminAPI.getSystemStats(),
      ]);
      setUsers(usersRes.data);
      setStats(statsRes.data);
    } catch (err) {
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      setError('');
      const { data } = await adminAPI.updateUserRole(userId, newRole);
      setUsers(users.map((u) => (u._id === userId ? { ...u, role: data.user.role } : u)));
      setSuccess(`Role updated to ${newRole} successfully`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update role');
    }
  };

  const handleToggleActive = async (userId) => {
    try {
      setError('');
      const { data } = await adminAPI.toggleUserActive(userId);
      setUsers(
        users.map((u) => (u._id === userId ? { ...u, isActive: data.user.isActive } : u))
      );
      setSuccess(data.message);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to toggle user status');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🛡️ Admin Panel</h1>
        <p>Manage users, projects, and system settings</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* System Stats */}
      {stats && (
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">👥</div>
            <div className="admin-stat-info">
              <h3>{stats.users.total}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon">🛡️</div>
            <div className="admin-stat-info">
              <h3>{stats.users.admins}</h3>
              <p>Admins</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon">📁</div>
            <div className="admin-stat-info">
              <h3>{stats.projects.total}</h3>
              <p>Projects</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon">📋</div>
            <div className="admin-stat-info">
              <h3>{stats.tasks.total}</h3>
              <p>Total Tasks</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-icon">✅</div>
            <div className="admin-stat-info">
              <h3>{stats.tasks.completed}</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="admin-stat-card admin-stat-alert">
            <div className="admin-stat-icon">⚠️</div>
            <div className="admin-stat-info">
              <h3>{stats.tasks.overdue}</h3>
              <p>Overdue</p>
            </div>
          </div>
        </div>
      )}

      {/* Users Management */}
      <div className="admin-section">
        <h2>User Management</h2>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className={!u.isActive ? 'inactive-row' : ''}>
                  <td>
                    <strong>
                      {u.firstName} {u.lastName}
                    </strong>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role-tag role-tag-${u.role}`}>{u.role}</span>
                  </td>
                  <td>
                    <span className={`status-tag ${u.isActive ? 'active' : 'inactive'}`}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="action-cell">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="role-select"
                    >
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      onClick={() => handleToggleActive(u._id)}
                      className={`btn btn-small ${u.isActive ? 'btn-warning' : 'btn-success'}`}
                    >
                      {u.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

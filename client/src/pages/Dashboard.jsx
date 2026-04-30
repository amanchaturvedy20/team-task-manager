import { useState, useEffect } from 'react';
import { dashboardAPI } from '../api';
import './Dashboard.css';

export const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const { data } = await dashboardAPI.getDashboard();
      setDashboard(data);
    } catch (err) {
      setError('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!dashboard) {
    return <div className="error-message">{error}</div>;
  }

  const stats = dashboard.taskStats;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Total Tasks</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>To Do</h3>
            <p className="stat-value">{stats.todo}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚙️</div>
          <div className="stat-content">
            <h3>In Progress</h3>
            <p className="stat-value">{stats.inProgress}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✔️</div>
          <div className="stat-content">
            <h3>Completed</h3>
            <p className="stat-value">{stats.completed}</p>
          </div>
        </div>

        <div className="stat-card alert-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>Overdue</h3>
            <p className="stat-value">{stats.overdue}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Recent Tasks</h2>
          {dashboard.recentTasks.length > 0 ? (
            <div className="tasks-list">
              {dashboard.recentTasks.map((task) => (
                <div key={task.id} className="task-item">
                  <div className="task-title">{task.title}</div>
                  <div className="task-details">
                    <span className={`status-badge status-${task.status}`}>{task.status}</span>
                    {task.dueDate && (
                      <span className="due-date">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-text">No tasks assigned to you yet</p>
          )}
        </div>

        <div className="card">
          <h2>Projects Overview</h2>
          {dashboard.projectOverview.length > 0 ? (
            <div className="projects-overview">
              {dashboard.projectOverview.map((project) => (
                <div key={project.id} className="project-overview-item">
                  <h4>{project.name}</h4>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${
                          project.totalTasks > 0
                            ? (project.completedTasks / project.totalTasks) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="project-stats-mini">
                    <span>
                      {project.completedTasks}/{project.totalTasks} completed
                    </span>
                    {project.overdueTasks > 0 && (
                      <span className="overdue-badge">{project.overdueTasks} overdue</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-text">No projects yet</p>
          )}
        </div>
      </div>
    </div>
  );
};


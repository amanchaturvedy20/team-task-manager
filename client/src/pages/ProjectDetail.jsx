import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectAPI, taskAPI, memberAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import './ProjectDetail.css';

export const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('tasks');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignedToId: '',
  });
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    loadProject();
    loadTasks();
    loadMembers();
  }, [projectId]);

  const loadProject = async () => {
    try {
      const { data } = await projectAPI.getProject(projectId);
      setProject(data);
    } catch (err) {
      setError('Failed to load project');
      setTimeout(() => navigate('/projects'), 2000);
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    try {
      const filters = {};
      if (filterStatus) filters.status = filterStatus;
      const { data } = await taskAPI.getTasks(projectId, filters);
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    }
  };

  const loadMembers = async () => {
    try {
      const { data } = await memberAPI.getMembers(projectId);
      setMembers(data);
    } catch (err) {
      // Members may fail if not authorized, that's okay
    }
  };

  useEffect(() => {
    if (projectId) loadTasks();
  }, [filterStatus]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      const taskData = { ...newTask };
      if (!taskData.assignedToId) delete taskData.assignedToId;
      if (!taskData.dueDate) delete taskData.dueDate;

      const { data } = await taskAPI.createTask(projectId, taskData);
      setTasks([...tasks, data.task]);
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', assignedToId: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      const { data } = await taskAPI.updateTask(projectId, taskId, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === taskId ? data.task : t)));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;

    try {
      await taskAPI.deleteTask(projectId, taskId);
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleDeleteProject = async () => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;

    try {
      await projectAPI.deleteProject(projectId);
      navigate('/projects');
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  const isOwner = project && user && project.ownerId?._id === user.id;
  const canDeleteProject = isOwner || isAdmin;

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!project) {
    return <div className="error-message">{error || 'Project not found'}</div>;
  }

  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  return (
    <div className="project-detail">
      <div className="project-header">
        <div>
          <h1>{project.name}</h1>
          <p className="project-desc">{project.description}</p>
          <div className="project-stats">
            <div className="stat">
              <span className="stat-number">{todoCount}</span>
              <span className="stat-label">To Do</span>
            </div>
            <div className="stat">
              <span className="stat-number">{inProgressCount}</span>
              <span className="stat-label">In Progress</span>
            </div>
            <div className="stat">
              <span className="stat-number">{completedCount}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>
        {canDeleteProject && (
          <button onClick={handleDeleteProject} className="btn btn-danger">
            Delete Project
          </button>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks ({tasks.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          Members ({members.length})
        </button>
      </div>

      {activeTab === 'tasks' && (
        <div className="tasks-section">
          <div className="tasks-header">
            <div className="filter-section">
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">All Tasks</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="create-task-card card">
            <h3>Create New Task</h3>
            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <select
                    value={newTask.assignedToId}
                    onChange={(e) => setNewTask({ ...newTask, assignedToId: e.target.value })}
                  >
                    <option value="">Assign to...</option>
                    {members.map((m) => (
                      <option key={m._id} value={m.userId?._id}>
                        {m.userId?.firstName} {m.userId?.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Description (optional)"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows="2"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Create Task
              </button>
            </form>
          </div>

          <div className="tasks-grid">
            {tasks.length === 0 ? (
              <div className="empty-state">No tasks found</div>
            ) : (
              tasks.map((task) => (
                <div key={task._id} className="task-card card">
                  <div className="task-header">
                    <h4>{task.title}</h4>
                    <span className={`badge badge-${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  {task.description && <p className="task-desc">{task.description}</p>}
                  <div className="task-meta">
                    {task.assignedToId && (
                      <span className="assigned">
                        👤 {task.assignedToId.firstName} {task.assignedToId.lastName}
                      </span>
                    )}
                    {task.dueDate && (
                      <span className={`due-date ${new Date(task.dueDate) < new Date() && task.status !== 'completed' ? 'overdue' : ''}`}>
                        📅 {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="task-actions">
                    <select
                      value={task.status}
                      onChange={(e) => handleTaskStatusChange(task._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="btn btn-danger btn-small"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="members-section">
          <div className="card">
            <h3>Project Members</h3>
            {members.length > 0 ? (
              <div className="members-list">
                {members.map((member) => (
                  <div key={member._id} className="member-item">
                    <div className="member-info">
                      <strong>
                        {member.userId?.firstName} {member.userId?.lastName}
                      </strong>
                      <span className="member-email">{member.userId?.email}</span>
                    </div>
                    <span className={`role-badge role-${member.role}`}>{member.role}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No members in this project</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function getPriorityColor(priority) {
  switch (priority) {
    case 'urgent':
      return 'danger';
    case 'high':
      return 'warning';
    case 'medium':
      return 'primary';
    default:
      return 'primary';
  }
}

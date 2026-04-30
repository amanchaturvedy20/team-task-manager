import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectAPI } from '../api';
import './Projects.css';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data } = await projectAPI.getProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;

    setCreating(true);
    try {
      const { data } = await projectAPI.createProject(newProject);
      setProjects([...projects, data.project]);
      setNewProject({ name: '', description: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Projects</h1>
      </div>

      <div className="projects-grid">
        <div className="card new-project-card">
          <form onSubmit={handleCreateProject}>
            <h3>Create New Project</h3>
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-group">
              <input
                type="text"
                placeholder="Project name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Description (optional)"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={creating}>
              {creating ? 'Creating...' : 'Create Project'}
            </button>
          </form>
        </div>

        {projects.map((project) => (
          <Link key={project.id} to={`/project/${project.id}`} className="card project-card">
            <div className="project-card-header">
              <h3>{project.name}</h3>
              <span className="badge badge-primary">{project.status}</span>
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-meta">
              <span>{project.members?.length || 0} members</span>
              <span>{project.tasks?.length || 0} tasks</span>
            </div>
          </Link>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="empty-state">
          <p>No projects yet. Create your first project to get started!</p>
        </div>
      )}
    </div>
  );
};


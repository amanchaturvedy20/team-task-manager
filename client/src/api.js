import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  // User auth
  userSignup: (email, firstName, lastName, password) =>
    api.post('/auth/user/signup', { email, firstName, lastName, password }),
  userLogin: (email, password) => api.post('/auth/user/login', { email, password }),

  // Admin auth
  adminSignup: (email, firstName, lastName, password) =>
    api.post('/auth/admin/signup', { email, firstName, lastName, password }),
  adminLogin: (email, password) => api.post('/auth/admin/login', { email, password }),

  // Profile
  getProfile: () => api.get('/auth/profile'),
};

// Project APIs
export const projectAPI = {
  createProject: (data) => api.post('/projects', data),
  getProjects: () => api.get('/projects'),
  getProject: (projectId) => api.get(`/projects/${projectId}`),
  updateProject: (projectId, data) => api.put(`/projects/${projectId}`, data),
  deleteProject: (projectId) => api.delete(`/projects/${projectId}`),
};

// Task APIs
export const taskAPI = {
  createTask: (projectId, data) => api.post(`/projects/${projectId}/tasks`, data),
  getTasks: (projectId, filters = {}) =>
    api.get(`/projects/${projectId}/tasks`, { params: filters }),
  getTask: (projectId, taskId) => api.get(`/projects/${projectId}/tasks/${taskId}`),
  updateTask: (projectId, taskId, data) =>
    api.put(`/projects/${projectId}/tasks/${taskId}`, data),
  deleteTask: (projectId, taskId) => api.delete(`/projects/${projectId}/tasks/${taskId}`),
};

// Member APIs
export const memberAPI = {
  addMember: (projectId, data) => api.post(`/projects/${projectId}/members`, data),
  getMembers: (projectId) => api.get(`/projects/${projectId}/members`),
  removeMember: (projectId, memberId) =>
    api.delete(`/projects/${projectId}/members/${memberId}`),
  updateMemberRole: (projectId, memberId, data) =>
    api.put(`/projects/${projectId}/members/${memberId}`, data),
};

// Dashboard APIs
export const dashboardAPI = {
  getDashboard: () => api.get('/dashboard'),
  getProjectStats: (projectId) => api.get(`/dashboard/project/${projectId}`),
};

export default api;


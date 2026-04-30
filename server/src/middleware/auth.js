import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }
    next();
  };
};

export const authorizeProjectAccess = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const { ProjectMember, Project } = await import('../models/index.js');
      const { projectId } = req.params;

      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      // Project owner has implicit access
      if (project.ownerId.toString() === req.user.id) {
        return next();
      }

      // Check project membership
      const membership = await ProjectMember.findOne({
        projectId,
        userId: req.user.id,
      });

      if (!membership || !allowedRoles.includes(membership.role)) {
        return res.status(403).json({ message: 'Forbidden: no access to this project' });
      }

      req.projectMembership = membership;
      next();
    } catch (error) {
      res.status(500).json({ message: 'Authorization check failed', error: error.message });
    }
  };
};


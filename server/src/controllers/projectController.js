import { Project, ProjectMember, User, Task } from '../models/index.js';
import { PROJECT_MEMBERS_ROLES } from '../config/constants.js';

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.validatedBody;

    const project = await Project.create({
      name,
      description,
      ownerId: req.user.id,
    });

    // Add creator as owner
    await ProjectMember.create({
      projectId: project._id,
      userId: req.user.id,
      role: PROJECT_MEMBERS_ROLES.OWNER,
    });

    const projectWithMembers = await Project.findById(project._id)
      .populate('ownerId', 'firstName lastName email')
      .populate({
        path: 'members',
        populate: { path: 'userId', select: 'firstName lastName email' },
      });

    res.status(201).json({
      message: 'Project created successfully',
      project: projectWithMembers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ ownerId: req.user.id })
      .populate('ownerId', 'firstName lastName email')
      .populate({
        path: 'members',
        populate: { path: 'userId', select: 'firstName lastName email' },
      });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)
      .populate('ownerId', 'firstName lastName email')
      .populate({
        path: 'members',
        populate: { path: 'userId', select: 'firstName lastName email' },
      })
      .populate({
        path: 'tasks',
        populate: [
          { path: 'createdById', select: 'firstName lastName email' },
          { path: 'assignedToId', select: 'firstName lastName email' },
        ],
      });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch project', error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description, status } = req.validatedBody;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Only owner can update project
    if (project.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only project owner can update' });
    }

    if (name) project.name = name;
    if (description !== undefined) project.description = description;
    if (status) project.status = status;

    await project.save();

    const updatedProject = await Project.findById(projectId)
      .populate('ownerId', 'firstName lastName email')
      .populate({
        path: 'members',
        populate: { path: 'userId', select: 'firstName lastName email' },
      });

    res.json({
      message: 'Project updated successfully',
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project', error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Only owner can delete
    if (project.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only project owner can delete' });
    }

    // Delete all related tasks
    await Task.deleteMany({ projectId });
    // Delete all members
    await ProjectMember.deleteMany({ projectId });
    // Delete project
    await project.deleteOne();

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
};


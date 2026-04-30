import { Task, Project, User } from '../models/index.js';

export const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, assignedToId, priority, dueDate } = req.validatedBody;

    // Verify project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Verify assigned user exists (if assigned)
    if (assignedToId) {
      const assignedUser = await User.findById(assignedToId);
      if (!assignedUser) {
        return res.status(404).json({ message: 'Assigned user not found' });
      }
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      createdById: req.user.id,
      assignedToId,
      priority,
      dueDate,
    });

    const taskWithRelations = await Task.findById(task._id)
      .populate('createdById', 'firstName lastName email')
      .populate('assignedToId', 'firstName lastName email');

    res.status(201).json({
      message: 'Task created successfully',
      task: taskWithRelations,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, assignedToId, priority } = req.query;

    // Verify project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const where = { projectId };
    if (status) where.status = status;
    if (assignedToId) where.assignedToId = assignedToId;
    if (priority) where.priority = priority;

    const tasks = await Task.find(where)
      .populate('createdById', 'firstName lastName email')
      .populate('assignedToId', 'firstName lastName email')
      .sort({ dueDate: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId)
      .populate('createdById', 'firstName lastName email')
      .populate('assignedToId', 'firstName lastName email')
      .populate('projectId', 'name');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch task', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, assignedToId, priority, dueDate } = req.validatedBody;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findById(task.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Only creator, assignee, or project owner can update
    if (
      task.createdById.toString() !== req.user.id &&
      task.assignedToId?.toString() !== req.user.id &&
      project.ownerId.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: 'Forbidden: cannot update this task' });
    }

    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) {
      task.status = status;
      if (status === 'completed') {
        task.completedAt = new Date();
      } else {
        task.completedAt = null;
      }
    }
    if (assignedToId !== undefined) task.assignedToId = assignedToId;
    if (priority) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();

    const updatedTask = await Task.findById(taskId)
      .populate('createdById', 'firstName lastName email')
      .populate('assignedToId', 'firstName lastName email');

    res.json({
      message: 'Task updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findById(task.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Only creator or project owner can delete
    if (task.createdById.toString() !== req.user.id && project.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: cannot delete this task' });
    }

    await task.deleteOne();

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};


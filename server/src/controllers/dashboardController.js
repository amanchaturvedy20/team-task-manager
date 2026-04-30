import { Task, Project, ProjectMember, User } from '../models/index.js';

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all projects user owns or is member of
    const ownedProjects = await Project.find({ ownerId: userId });

    const memberProjects = await ProjectMember.find({ userId }).populate('projectId');

    const allProjectIds = [
      ...ownedProjects.map((p) => p._id),
      ...memberProjects.map((m) => m.projectId._id),
    ];

    // Get task statistics
    const taskStats = {
      total: 0,
      todo: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0,
    };

    const tasks = await Task.find({ projectId: { $in: allProjectIds } })
      .populate('createdById')
      .populate('assignedToId');

    const usersTasks = tasks.filter((t) => t.assignedToId?._id == userId);

    taskStats.total = usersTasks.length;
    taskStats.todo = usersTasks.filter((t) => t.status === 'todo').length;
    taskStats.inProgress = usersTasks.filter((t) => t.status === 'in_progress').length;
    taskStats.completed = usersTasks.filter((t) => t.status === 'completed').length;

    const now = new Date();
    taskStats.overdue = usersTasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== 'completed'
    ).length;

    // Get recent tasks (last 10)
    const recentTasks = usersTasks
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    // Get project overview
    const projectOverview = await Promise.all(
      allProjectIds.map(async (projectId) => {
        const project = await Project.findById(projectId);
        const projectTasks = tasks.filter((t) => t.projectId._id == projectId);

        return {
          id: project._id,
          name: project.name,
          totalTasks: projectTasks.length,
          completedTasks: projectTasks.filter((t) => t.status === 'completed').length,
          overdueTasks: projectTasks.filter(
            (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== 'completed'
          ).length,
        };
      })
    );

    res.json({
      taskStats,
      recentTasks,
      projectOverview,
      totalProjects: allProjectIds.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard', error: error.message });
  }
};

export const getProjectStats = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const tasks = await Task.find({ projectId });

    const now = new Date();

    const stats = {
      totalTasks: tasks.length,
      todoTasks: tasks.filter((t) => t.status === 'todo').length,
      inProgressTasks: tasks.filter((t) => t.status === 'in_progress').length,
      completedTasks: tasks.filter((t) => t.status === 'completed').length,
      cancelledTasks: tasks.filter((t) => t.status === 'cancelled').length,
      overdueTasks: tasks.filter(
        (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== 'completed'
      ).length,
      completionPercentage:
        tasks.length > 0
          ? Math.round((tasks.filter((t) => t.status === 'completed').length / tasks.length) * 100)
          : 0,
      highPriorityTasks: tasks.filter((t) => t.priority === 'high' || t.priority === 'urgent')
        .length,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch project stats', error: error.message });
  }
};


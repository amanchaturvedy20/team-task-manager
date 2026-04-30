import { User, Project, ProjectMember, Task } from '../models/index.js';

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const { role, search } = req.query;
    const filter = {};

    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

// Update user role (admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['admin', 'member'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be admin or member.' });
    }

    // Prevent self-demotion
    if (userId === req.user.id) {
      return res.status(400).json({ message: 'Cannot change your own role' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.json({
      message: 'User role updated successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user role', error: error.message });
  }
};

// Toggle user active status (admin only)
export const toggleUserActive = async (req, res) => {
  try {
    const { userId } = req.params;

    // Prevent self-deactivation
    if (userId === req.user.id) {
      return res.status(400).json({ message: 'Cannot deactivate yourself' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle user status', error: error.message });
  }
};

// Get system stats (admin only)
export const getSystemStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalMembers = await User.countDocuments({ role: 'member' });
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalProjects = await Project.countDocuments();
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: 'completed' },
    });

    res.json({
      users: { total: totalUsers, admins: totalAdmins, members: totalMembers, active: activeUsers },
      projects: { total: totalProjects },
      tasks: { total: totalTasks, completed: completedTasks, overdue: overdueTasks },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch system stats', error: error.message });
  }
};

// Get all projects (admin only)
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('ownerId', 'firstName lastName email')
      .populate({
        path: 'members',
        populate: { path: 'userId', select: 'firstName lastName email' },
      })
      .populate('tasks')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
};

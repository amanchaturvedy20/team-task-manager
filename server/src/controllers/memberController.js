import { ProjectMember, Project, User, Task } from '../models/index.js';
import { USER_ROLES } from '../config/constants.js';

export const addProjectMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId, role } = req.validatedBody;

    // Verify project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Only owner or admin can add members
    if (project.ownerId.toString() !== req.user.id && req.user.role !== USER_ROLES.ADMIN) {
      return res.status(403).json({ message: 'Only project owner or admin can add members' });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already a member
    const existingMember = await ProjectMember.findOne({
      projectId,
      userId,
    });

    if (existingMember) {
      return res.status(400).json({ message: 'User is already a project member' });
    }

    const member = await ProjectMember.create({
      projectId,
      userId,
      role,
    });

    const memberWithUser = await ProjectMember.findById(member._id).populate(
      'userId',
      'firstName lastName email'
    );

    res.status(201).json({
      message: 'Member added successfully',
      member: memberWithUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add member', error: error.message });
  }
};

export const getProjectMembers = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const members = await ProjectMember.find({ projectId }).populate(
      'userId',
      'email firstName lastName'
    );

    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch members', error: error.message });
  }
};

export const removeProjectMember = async (req, res) => {
  try {
    const { projectId, memberId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Only owner or admin can remove members
    if (project.ownerId.toString() !== req.user.id && req.user.role !== USER_ROLES.ADMIN) {
      return res.status(403).json({ message: 'Only project owner or admin can remove members' });
    }

    const member = await ProjectMember.findById(memberId);
    if (!member || member.projectId.toString() !== projectId) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Cannot remove owner
    if (member.role === 'owner') {
      return res.status(400).json({ message: 'Cannot remove project owner' });
    }

    await member.deleteOne();

    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove member', error: error.message });
  }
};

export const updateMemberRole = async (req, res) => {
  try {
    const { projectId, memberId } = req.params;
    const { role } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Only owner or admin can change roles
    if (project.ownerId.toString() !== req.user.id && req.user.role !== USER_ROLES.ADMIN) {
      return res.status(403).json({ message: 'Only project owner or admin can change roles' });
    }

    const member = await ProjectMember.findById(memberId);
    if (!member || member.projectId.toString() !== projectId) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Cannot change owner role
    if (member.role === 'owner') {
      return res.status(400).json({ message: 'Cannot change owner role' });
    }

    member.role = role;
    await member.save();

    const updatedMember = await ProjectMember.findById(memberId).populate(
      'userId',
      'firstName lastName email'
    );

    res.json({
      message: 'Member role updated successfully',
      member: updatedMember,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update member role', error: error.message });
  }
};

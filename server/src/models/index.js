import User from './User.js';
import Project from './Project.js';
import ProjectMember from './ProjectMember.js';
import Task from './Task.js';

// MongoDB with Mongoose handles relationships through refs, not explicit associations
// Populate is used in queries when needed

export { User, Project, ProjectMember, Task };


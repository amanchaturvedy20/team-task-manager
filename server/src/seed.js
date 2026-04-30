import { connectDB } from './config/database.js';
import { User, Project, ProjectMember, Task } from './models/index.js';
import { USER_ROLES, TASK_STATUS, TASK_PRIORITY, PROJECT_MEMBERS_ROLES } from './config/constants.js';
import dotenv from 'dotenv';

dotenv.config();

async function seedDatabase() {
  try {
    await connectDB();
    console.log('Database connection successful');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await ProjectMember.deleteMany({});
    await Task.deleteMany({});
    console.log('Cleared existing data');

    // Create seed users
    const admin = await User.create({
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      password: 'password123',
      role: USER_ROLES.ADMIN,
    });

    const member1 = await User.create({
      email: 'alice@example.com',
      firstName: 'Alice',
      lastName: 'Johnson',
      password: 'password123',
      role: USER_ROLES.MEMBER,
    });

    const member2 = await User.create({
      email: 'bob@example.com',
      firstName: 'Bob',
      lastName: 'Smith',
      password: 'password123',
      role: USER_ROLES.MEMBER,
    });

    console.log('✓ Users created');

    // Create seed projects
    const project1 = await Project.create({
      name: 'Website Redesign',
      description: 'Complete redesign of the main website',
      ownerId: admin._id,
      status: 'active',
    });

    const project2 = await Project.create({
      name: 'Mobile App Development',
      description: 'Build iOS and Android apps',
      ownerId: member1._id,
      status: 'active',
    });

    console.log('✓ Projects created');

    // Add project members
    await ProjectMember.create({
      projectId: project1._id,
      userId: admin._id,
      role: PROJECT_MEMBERS_ROLES.OWNER,
    });

    await ProjectMember.create({
      projectId: project1._id,
      userId: member1._id,
      role: PROJECT_MEMBERS_ROLES.LEAD,
    });

    await ProjectMember.create({
      projectId: project1._id,
      userId: member2._id,
      role: PROJECT_MEMBERS_ROLES.MEMBER,
    });

    await ProjectMember.create({
      projectId: project2._id,
      userId: member1._id,
      role: PROJECT_MEMBERS_ROLES.OWNER,
    });

    await ProjectMember.create({
      projectId: project2._id,
      userId: admin._id,
      role: PROJECT_MEMBERS_ROLES.MEMBER,
    });

    console.log('✓ Project members added');

    // Create seed tasks
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    await Task.create({
      title: 'Design homepage',
      description: 'Create mockups for the new homepage',
      projectId: project1._id,
      createdById: admin._id,
      assignedToId: member1._id,
      status: TASK_STATUS.IN_PROGRESS,
      priority: TASK_PRIORITY.HIGH,
      dueDate: tomorrow,
    });

    await Task.create({
      title: 'Develop backend API',
      description: 'Create REST APIs for user management',
      projectId: project1._id,
      createdById: admin._id,
      assignedToId: member2._id,
      status: TASK_STATUS.TODO,
      priority: TASK_PRIORITY.URGENT,
      dueDate: nextWeek,
    });

    await Task.create({
      title: 'UI testing',
      description: 'Test all UI components in different browsers',
      projectId: project1._id,
      createdById: member1._id,
      assignedToId: member1._id,
      status: TASK_STATUS.COMPLETED,
      priority: TASK_PRIORITY.MEDIUM,
      completedAt: now,
    });

    await Task.create({
      title: 'iOS app development',
      description: 'Develop core features for iOS app',
      projectId: project2._id,
      createdById: member1._id,
      assignedToId: member1._id,
      status: TASK_STATUS.IN_PROGRESS,
      priority: TASK_PRIORITY.HIGH,
      dueDate: nextWeek,
    });

    await Task.create({
      title: 'Documentation',
      description: 'Write API documentation',
      projectId: project2._id,
      createdById: member1._id,
      assignedToId: admin._id,
      status: TASK_STATUS.TODO,
      priority: TASK_PRIORITY.LOW,
      dueDate: nextWeek,
    });

    console.log('✓ Tasks created');

    console.log('\n✅ Database seeded successfully!\n');
    console.log('Test Accounts:');
    console.log('- Admin: admin@example.com / password123');
    console.log('- Member 1: alice@example.com / password123');
    console.log('- Member 2: bob@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();


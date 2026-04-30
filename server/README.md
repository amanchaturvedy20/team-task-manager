# Team Task Manager - Backend

Backend API for the Team Task Manager application built with Express.js and PostgreSQL.

## Features

- User authentication (signup/login) with JWT
- Project creation and management
- Task assignment and tracking
- Team member management with role-based access control
- Dashboard with task statistics and progress tracking
- Complete CRUD operations for all entities

## Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** PostgreSQL  
- **ORM:** Sequelize  
- **Authentication:** JWT (JSON Web Tokens)  
- **Validation:** Joi  
- **Security:** bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL (v12+)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure your database:
```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/team_task_manager
JWT_SECRET=your_secret_key_here
PORT=5000
```

### Database Setup

1. Create PostgreSQL database:
```bash
createdb team_task_manager
```

2. Run migrations (Sequelize will sync models):
```bash
npm start
```

3. Seed sample data (optional):
```bash
npm run seed
```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server will run on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Projects
- `GET /api/projects` - List all user's projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:projectId` - Get project details
- `PUT /api/projects/:projectId` - Update project
- `DELETE /api/projects/:projectId` - Delete project

### Tasks
- `GET /api/projects/:projectId/tasks` - List project tasks
- `POST /api/projects/:projectId/tasks` - Create task
- `GET /api/projects/:projectId/tasks/:taskId` - Get task details
- `PUT /api/projects/:projectId/tasks/:taskId` - Update task
- `DELETE /api/projects/:projectId/tasks/:taskId` - Delete task

### Project Members
- `GET /api/projects/:projectId/members` - List project members
- `POST /api/projects/:projectId/members` - Add member to project
- `DELETE /api/projects/:projectId/members/:memberId` - Remove member
- `PUT /api/projects/:projectId/members/:memberId` - Update member role

### Dashboard
- `GET /api/dashboard` - Get user dashboard stats
- `GET /api/dashboard/project/:projectId` - Get project statistics

## Database Schema

### Users
- id, email, firstName, lastName, password, role, isActive, createdAt, updatedAt

### Projects
- id, name, description, ownerId, status, createdAt, updatedAt

### ProjectMembers
- id, projectId, userId, role, joinedAt, createdAt, updatedAt

### Tasks
- id, title, description, projectId, createdById, assignedToId, status, priority, dueDate, completedAt, createdAt, updatedAt

## Role-Based Access Control

### User Roles
- **Admin:** Full system access
- **Member:** Standard user access

### Project Roles
- **Owner:** Full project control, manage members
- **Lead:** Can create/manage tasks
- **Member:** Can view and update assigned tasks

## Environment Variables

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/db_name
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

## Error Handling

All endpoints return JSON responses with appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Development

### File Structure
```
server/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── constants.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   ├── memberController.js
│   │   └── dashboardController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── ProjectMember.js
│   │   ├── Task.js
│   │   └── index.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── members.js
│   │   ├── tasks.js
│   │   └── dashboard.js
│   ├── index.js
│   └── seed.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```


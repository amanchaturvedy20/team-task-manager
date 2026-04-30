<p align="center">
  <img src="https://img.icons8.com/3d-fluency/94/clipboard-list.png" alt="Logo" width="80"/>
</p>

<h1 align="center">Team Task Manager</h1>

<p align="center">
  <strong>A full-stack web application for managing team projects and tasks with role-based access control.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="Version"/>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome"/>
</p>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Role-Based Access Control](#-role-based-access-control)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Team Task Manager** is a modern, full-stack project management application designed for teams to collaborate efficiently. It provides a clean, intuitive interface for creating projects, assigning tasks, tracking progress, and managing team members — all with robust role-based access control.

Built with the **MERN stack** (MongoDB, Express.js, React, Node.js), it features separate Admin and Member roles with distinct permissions, real-time task status tracking, and a comprehensive dashboard with analytics.

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure signup and login with **JWT (JSON Web Tokens)**
- Password hashing with **bcrypt**
- Separate login flows for **Admin** and **Member** roles
- Role toggle on login/signup pages
- Auto-logout on token expiration
- Protected routes on both frontend and backend

### 📁 Project Management
- Create, update, and delete projects
- Project status tracking (Active, Archived, Completed)
- View all projects you own or are a member of
- Admin can view and manage **all projects** system-wide
- Owner badge on project cards

### ✅ Task Management
- Create tasks with **title, description, priority, and due date**
- Assign tasks to team members via dropdown
- **4 Priority Levels:** Low, Medium, High, Urgent
- **4 Status Options:** To Do, In Progress, Completed, Cancelled
- Inline status updates with dropdowns
- Filter tasks by status
- Overdue task highlighting
- Delete tasks (owner, creator, or admin)

### 👥 Team Management
- Add members to projects
- Assign project-level roles: **Owner, Lead, Member**
- Remove members from projects
- Update member roles
- Compound unique index prevents duplicate memberships

### 📊 Dashboard & Analytics
- **Task statistics:** Total, To Do, In Progress, Completed, Overdue
- **Recent tasks** list with status badges
- **Project progress** with visual progress bars
- **Completion percentages** per project
- Overdue task alerts
- Admin sees **system-wide stats**; Members see **personal stats**

### 🛡️ Admin Panel
- **System overview:** Total users, admins, projects, tasks, completed, overdue
- **User management table:** View all users with role, status, and join date
- **Change user roles:** Promote to admin or demote to member
- **Activate/Deactivate users:** Toggle user access
- Admin-only access with route protection

---

## 🏗️ Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | ODM (Object Document Mapper) |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Joi** | Request validation |
| **express-async-errors** | Async error handling |
| **CORS** | Cross-origin resource sharing |
| **dotenv** | Environment variables |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client |
| **Vite** | Build tool & dev server |
| **CSS3** | Styling (no frameworks) |

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│                   React + Vite                          │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  Auth    │  │ Dashboard│  │ Projects │  │ Admin  │ │
│  │  Pages   │  │  Page    │  │  Pages   │  │ Panel  │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘ │
│       │              │              │             │      │
│       └──────────────┴──────────────┴─────────────┘      │
│                          │                               │
│                    Axios API Client                      │
│                   (with JWT interceptor)                 │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP REST API
┌──────────────────────────┴──────────────────────────────┐
│                      BACKEND                            │
│                   Express.js                            │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Middleware Layer                     │    │
│  │  ┌────────┐  ┌───────────┐  ┌────────────────┐ │    │
│  │  │  CORS  │  │   Auth    │  │  Validation    │ │    │
│  │  │        │  │  (JWT)    │  │  (Joi)         │ │    │
│  │  └────────┘  └───────────┘  └────────────────┘ │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  Auth    │  │ Project  │  │  Task    │  │ Admin  │ │
│  │ Routes   │  │ Routes   │  │ Routes   │  │ Routes │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘ │
│       │              │              │             │      │
│  ┌────┴─────┐  ┌────┴─────┐  ┌────┴─────┐  ┌───┴────┐ │
│  │  Auth    │  │ Project  │  │  Task    │  │ Admin  │ │
│  │Controller│  │Controller│  │Controller│  │Contrlr │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
│                          │                              │
│                   Mongoose ODM                          │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────┴──────────────────────────────┐
│                    MongoDB Atlas                        │
│  ┌────────┐  ┌──────────┐  ┌───────────────┐  ┌─────┐ │
│  │ Users  │  │ Projects │  │ProjectMembers │  │Tasks│ │
│  └────────┘  └──────────┘  └───────────────┘  └─────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** v8 or higher
- **MongoDB Atlas** account (free tier) or local MongoDB installation

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager
```

**2. Setup Backend**

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory (see [Environment Variables](#-environment-variables)).

**3. Setup Frontend**

```bash
cd ../client
npm install
```

Create a `.env.local` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

**4. Seed the Database (Optional)**

```bash
cd ../server
npm run seed
```

This creates 3 demo accounts, 2 projects, and 5 sample tasks.

**5. Start the Application**

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

**6. Open in Browser**

Navigate to `http://localhost:3000`

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| 🛡️ Admin | `admin@example.com` | `password123` |
| 👤 Member | `alice@example.com` | `password123` |
| 👤 Member | `bob@example.com` | `password123` |

---

## 🔧 Environment Variables

### Server (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `JWT_SECRET` | Secret key for JWT signing | `your_super_secret_key` |
| `JWT_EXPIRE` | Token expiration time | `7d` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:3000` |

### Client (`client/.env.local`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

---

## 📊 Database Schema

### Users Collection

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Unique identifier |
| `email` | String | User email (unique, lowercase) |
| `firstName` | String | First name |
| `lastName` | String | Last name |
| `password` | String | Hashed password (bcrypt) |
| `role` | String | `admin` or `member` |
| `isActive` | Boolean | Account status |
| `createdAt` | Date | Auto-generated |
| `updatedAt` | Date | Auto-generated |

### Projects Collection

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Unique identifier |
| `name` | String | Project name |
| `description` | String | Project description |
| `ownerId` | ObjectId → User | Project owner reference |
| `status` | String | `active`, `archived`, `completed` |
| `members` | Virtual | Populated from ProjectMembers |
| `tasks` | Virtual | Populated from Tasks |

### ProjectMembers Collection

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Unique identifier |
| `projectId` | ObjectId → Project | Project reference |
| `userId` | ObjectId → User | User reference |
| `role` | String | `owner`, `lead`, `member` |
| `joinedAt` | Date | When user joined |

> **Unique Index:** `{ projectId, userId }` — prevents duplicate memberships.

### Tasks Collection

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Unique identifier |
| `title` | String | Task title |
| `description` | String | Task description |
| `projectId` | ObjectId → Project | Parent project |
| `createdById` | ObjectId → User | Task creator |
| `assignedToId` | ObjectId → User | Assigned user (nullable) |
| `status` | String | `todo`, `in_progress`, `completed`, `cancelled` |
| `priority` | String | `low`, `medium`, `high`, `urgent` |
| `dueDate` | Date | Due date (nullable) |
| `completedAt` | Date | Completion timestamp |

---

## 📚 API Documentation

> All routes (except auth) require a JWT token in the `Authorization` header:
> ```
> Authorization: Bearer <token>
> ```

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/user/signup` | Register as member | ❌ |
| `POST` | `/api/auth/user/login` | Login as member | ❌ |
| `POST` | `/api/auth/admin/signup` | Register as admin | ❌ |
| `POST` | `/api/auth/admin/login` | Login as admin | ❌ |
| `GET` | `/api/auth/profile` | Get current user profile | ✅ |

<details>
<summary><strong>Request/Response Examples</strong></summary>

**POST `/api/auth/user/signup`**
```json
// Request
{
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "password123"
}

// Response (201)
{
  "message": "Signup successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "member"
  }
}
```

</details>

---

### Projects

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/api/projects` | List user's projects (admin: all) | ✅ | Any |
| `POST` | `/api/projects` | Create a new project | ✅ | Any |
| `GET` | `/api/projects/:id` | Get project details | ✅ | Member+ |
| `PUT` | `/api/projects/:id` | Update project | ✅ | Owner/Admin |
| `DELETE` | `/api/projects/:id` | Delete project + tasks + members | ✅ | Owner/Admin |

---

### Tasks

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/api/projects/:id/tasks` | List project tasks | ✅ | Member+ |
| `POST` | `/api/projects/:id/tasks` | Create a task | ✅ | Member+ |
| `GET` | `/api/projects/:id/tasks/:taskId` | Get task details | ✅ | Member+ |
| `PUT` | `/api/projects/:id/tasks/:taskId` | Update task | ✅ | Creator/Assignee/Owner/Admin |
| `DELETE` | `/api/projects/:id/tasks/:taskId` | Delete task | ✅ | Creator/Owner/Admin |

**Query Parameters for GET tasks:**
- `status` — Filter by status (`todo`, `in_progress`, `completed`, `cancelled`)
- `priority` — Filter by priority (`low`, `medium`, `high`, `urgent`)
- `assignedToId` — Filter by assigned user ID

---

### Members

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/api/projects/:id/members` | List project members | ✅ | Member+ |
| `POST` | `/api/projects/:id/members` | Add a member | ✅ | Owner/Admin |
| `PUT` | `/api/projects/:id/members/:memberId` | Update member role | ✅ | Owner/Admin |
| `DELETE` | `/api/projects/:id/members/:memberId` | Remove a member | ✅ | Owner/Admin |

---

### Dashboard

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/dashboard` | Get dashboard data | ✅ |
| `GET` | `/api/dashboard/project/:id` | Get project statistics | ✅ |

---

### Admin (Admin Only)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/api/admin/users` | List all users | ✅ | Admin |
| `PUT` | `/api/admin/users/:id/role` | Change user role | ✅ | Admin |
| `PUT` | `/api/admin/users/:id/toggle-active` | Activate/deactivate user | ✅ | Admin |
| `GET` | `/api/admin/stats` | System-wide statistics | ✅ | Admin |
| `GET` | `/api/admin/projects` | List all projects | ✅ | Admin |

---

## 🔒 Role-Based Access Control

### System Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| **Admin** | System administrator | Full access to all resources. Can manage users, view all projects/tasks, and override ownership restrictions. |
| **Member** | Regular user | Can create projects, manage own projects, view/edit assigned tasks. Limited to projects they own or are a member of. |

### Project Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| **Owner** | Project creator | Full control: manage members, tasks, and project settings. Can delete the project. |
| **Lead** | Team lead | Can view project, create/manage tasks. |
| **Member** | Team member | Can view project and tasks, update assigned tasks. |

### Permission Matrix

| Action | Admin | Project Owner | Project Lead | Project Member |
|--------|:-----:|:-------------:|:------------:|:--------------:|
| View all projects | ✅ | ❌ | ❌ | ❌ |
| Create project | ✅ | ✅ | ✅ | ✅ |
| Update project | ✅ | ✅ | ❌ | ❌ |
| Delete project | ✅ | ✅ | ❌ | ❌ |
| Add members | ✅ | ✅ | ❌ | ❌ |
| Remove members | ✅ | ✅ | ❌ | ❌ |
| Create task | ✅ | ✅ | ✅ | ✅ |
| Update any task | ✅ | ✅ | ❌ | ❌ |
| Update own task | ✅ | ✅ | ✅ | ✅ |
| Delete task | ✅ | ✅ | ❌ | ❌ |
| Admin panel | ✅ | ❌ | ❌ | ❌ |
| Manage users | ✅ | ❌ | ❌ | ❌ |

---

## 📁 Project Structure

```
team-task-manager/
│
├── server/                          # 🖥️  Express.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── constants.js         # Role & status enums
│   │   │   └── database.js          # MongoDB connection
│   │   │
│   │   ├── controllers/
│   │   │   ├── adminController.js   # Admin panel logic
│   │   │   ├── authController.js    # Login, signup, profile
│   │   │   ├── dashboardController.js # Dashboard stats
│   │   │   ├── memberController.js  # Project member CRUD
│   │   │   ├── projectController.js # Project CRUD
│   │   │   └── taskController.js    # Task CRUD
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT auth & role authorization
│   │   │   └── validation.js        # Joi request validation
│   │   │
│   │   ├── models/
│   │   │   ├── index.js             # Model exports
│   │   │   ├── Project.js           # Project schema + virtuals
│   │   │   ├── ProjectMember.js     # Membership schema
│   │   │   ├── Task.js              # Task schema
│   │   │   └── User.js              # User schema + password hashing
│   │   │
│   │   ├── routes/
│   │   │   ├── admin.js             # Admin-only routes
│   │   │   ├── auth.js              # Auth routes
│   │   │   ├── dashboard.js         # Dashboard routes
│   │   │   ├── members.js           # Member routes
│   │   │   ├── projects.js          # Project routes
│   │   │   └── tasks.js             # Task routes
│   │   │
│   │   ├── index.js                 # Server entry point
│   │   └── seed.js                  # Database seeder
│   │
│   ├── .env                         # Environment variables
│   └── package.json
│
├── client/                          # ⚛️  React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx           # App layout with nav
│   │   │   ├── Layout.css
│   │   │   └── ProtectedRoute.jsx   # Auth guard component
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Auth state management
│   │   │
│   │   ├── pages/
│   │   │   ├── AdminPanel.jsx       # Admin user management
│   │   │   ├── AdminPanel.css
│   │   │   ├── Auth.jsx             # Login & Signup pages
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.jsx        # Dashboard with stats
│   │   │   ├── Dashboard.css
│   │   │   ├── ProjectDetail.jsx    # Project view with tasks
│   │   │   ├── ProjectDetail.css
│   │   │   ├── Projects.jsx         # Projects listing
│   │   │   └── Projects.css
│   │   │
│   │   ├── styles/
│   │   │   └── index.css            # Global styles & design tokens
│   │   │
│   │   ├── api.js                   # Axios API client
│   │   ├── App.jsx                  # Root component & routing
│   │   └── main.jsx                 # Entry point
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── .env.local
│   └── package.json
│
└── README.md
```

---

## 📸 Screenshots

### Login Page
> Role toggle lets users switch between Member and Admin login.

### Admin Dashboard
> System-wide statistics with task counts, recent tasks, and project progress bars.

### Admin Panel
> User management with role changes and activate/deactivate controls.

### Project Detail
> Task cards with priority badges, status dropdowns, assignee info, and due dates.

### Projects Page
> Project cards with member/task counts and owner badges.

---

## 🔮 Future Enhancements

- [ ] 💬 Task comments and activity log
- [ ] 📎 File attachments for tasks
- [ ] 🔔 Email/push notifications
- [ ] 🔄 Real-time updates with WebSockets
- [ ] 🔍 Advanced search and filtering
- [ ] 📤 Export to CSV/PDF
- [ ] 📱 Mobile responsive improvements
- [ ] 🌙 Dark mode theme
- [ ] 📈 Advanced analytics & charts
- [ ] 🔗 Third-party integrations (Slack, GitHub)

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please make sure to:
- Follow the existing code style
- Add proper validation for new endpoints
- Update documentation for new features
- Test with both Admin and Member roles

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>Built with ❤️ for team collaboration</strong>
</p>

<p align="center">
  <a href="#-table-of-contents">⬆️ Back to Top</a>
</p>

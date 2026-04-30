# Team Task Manager

A modern web application for managing team projects and tasks with role-based access control.

## 🚀 Features

- **User Authentication**
  - Signup and login with JWT
  - Secure password hashing
  - Profile management

- **Project Management**
  - Create and manage projects
  - Add team members with roles
  - Project status tracking
  - Delete projects (owner only)

- **Task Management**
  - Create tasks with priority levels
  - Assign tasks to team members
  - Track task status (Todo, In Progress, Completed, Cancelled)
  - Set due dates
  - Filter tasks by status
  - Delete tasks

- **Team Management**
  - Add members to projects
  - Assign roles (Owner, Lead, Member)
  - Remove members
  - Update member roles

- **Dashboard & Analytics**
  - Task statistics overview
  - Recent tasks list
  - Project progress tracking
  - Overdue task alerts
  - Completion percentages

- **Role-Based Access Control**
  - Admin: Full system access
  - Member: Standard access
  - Project roles: Owner, Lead, Member

## 🏗️ Project Structure

```
team-task-manager/
├── server/                 # Express.js backend
│   ├── src/
│   │   ├── config/        # Database and app config
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Auth & validation
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── index.js       # Server entry point
│   │   └── seed.js        # Database seeding
│   ├── .env.example
│   └── package.json
│
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Auth context
│   │   ├── pages/         # Page components
│   │   ├── styles/        # Global styles
│   │   ├── api.js         # API client
│   │   ├── App.jsx        # Main app
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🏗️ Tech Stack

### Backend
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (Cloud with Atlas)
- **ODM:** Mongoose  
- **Auth:** JWT (JSON Web Tokens)  
- **Validation:** Joi  
- **Security:** bcryptjs for password hashing

### Frontend
- **Framework:** React 18
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Build Tool:** Vite
- **Styling:** CSS3

## 📋 Prerequisites

- Node.js v16+
- MongoDB Atlas Account (free tier available) or Local MongoDB installation
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Setup Backend

```bash
cd server
npm install
cp .env.example .env
```

**Edit .env with your MongoDB connection string:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/?appName=AppName
JWT_SECRET=your_secret_key_here
PORT=5000
```


**Start backend:**

```bash
npm run dev
```

**Seed sample data (optional):**

```bash
npm run seed
```

### 2. Setup Frontend

```bash
cd client
npm install
cp .env.example .env.local
```

**Start frontend:**

```bash
npm run dev
```

## 📚 Usage

### Access the Application

Open browser and navigate to `http://localhost:3000`

### Demo Accounts (if seeded)

```
Email: alice@example.com
Password: password123

Email: bob@example.com
Password: password123

Email: admin@example.com
Password: password123
```

### Create Your Account

1. Click "Sign up"
2. Enter your details
3. Create projects and start managing tasks!

## 🔐 Authentication

- JWT tokens stored in localStorage
- Auto-logout on token expiration
- Password hashing with bcryptjs
- Protected routes on frontend and backend

## 📊 Database Schema

### Users
- id, email, firstName, lastName, password, role, isActive

### Projects
- id, name, description, ownerId, status

### ProjectMembers
- id, projectId, userId, role, joinedAt

### Tasks
- id, title, description, projectId, createdById, assignedToId, status, priority, dueDate, completedAt

## 🛣️ API Routes

All routes require JWT authentication (except signup/login).

### Auth
```
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/profile
```

### Projects
```
GET    /api/projects
POST   /api/projects
GET    /api/projects/:projectId
PUT    /api/projects/:projectId
DELETE /api/projects/:projectId
```

### Tasks
```
GET    /api/projects/:projectId/tasks
POST   /api/projects/:projectId/tasks
GET    /api/projects/:projectId/tasks/:taskId
PUT    /api/projects/:projectId/tasks/:taskId
DELETE /api/projects/:projectId/tasks/:taskId
```

### Members
```
GET    /api/projects/:projectId/members
POST   /api/projects/:projectId/members
DELETE /api/projects/:projectId/members/:memberId
PUT    /api/projects/:projectId/members/:memberId
```

### Dashboard
```
GET    /api/dashboard
GET    /api/dashboard/project/:projectId
```

## 🎨 Features in Detail

### Projects Page
- Create new projects
- View all projects you own or are member of
- Quick stats (members, tasks)
- Click to view project details

### Project Detail
- All project tasks with filters
- Create new tasks
- Update task status, priority, assignee
- Delete tasks
- View and manage team members
- Delete project (owner only)

### Dashboard
- Task statistics overview
- Recent tasks assigned to you
- Project progress with completion %
- Overdue task indicators

### Task Management
- Create with priority (Low, Medium, High, Urgent)
- Assign to team members
- Set due dates
- Filter by status
- Update status inline
- Delete tasks

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control
- Input validation with Joi
- Protected API endpoints
- CORS configuration
- Request/response validation

## 📈 Future Enhancements

- Task comments and activity log
- File attachments
- Notifications (email/push)
- Real-time updates with WebSockets
- Advanced filtering and search
- Custom fields
- Team collaboration features
- Export to CSV/PDF
- Mobile app

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Backend (change PORT in .env)
# Frontend (change port in vite.config.js)
```

### Database Connection Failed
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists

### API Not Responding
- Check backend is running on port 5000
- Verify VITE_API_URL in .env.local
- Check network tab in DevTools

### CORS Errors
- Verify CORS_ORIGIN in backend .env
- Check frontend URL matches

## 📝 Development Tips

1. **Backend Development**
   - Use `npm run dev` for auto-reload with nodemon
   - Check `src/seed.js` for sample data structure
   - Models are in `src/models/`

2. **Frontend Development**
   - Vite provides fast HMR
   - Check `src/api.js` for API client setup
   - Use React DevTools for debugging

3. **Database**
   - Models auto-sync on server start
   - Use seed script for sample data
   - Check Sequelize docs for advanced queries

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions welcome! Feel free to submit issues and enhancement requests.

---

**Built with ❤️ for team collaboration**


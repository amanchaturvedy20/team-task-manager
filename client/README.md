# Team Task Manager - Frontend

Frontend React application for the Team Task Manager - a collaborative project and task management platform.

## Features

- User authentication (signup/login with JWT)
- Project creation and management
- Task creation, assignment, and status tracking
- Real-time task filtering and updates
- Dashboard with task statistics and progress overview
- Responsive design for mobile and desktop

## Tech Stack

- **Framework:** React 18
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Build Tool:** Vite
- **Styling:** CSS3

## Getting Started

### Prerequisites

- Node.js (v16+)
- Running backend server on http://localhost:5000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode
```bash
npm run dev
```

Server will run on http://localhost:3000

### Production Build
```bash
npm run build
```

Preview build:
```bash
npm run preview
```

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Layout.jsx        # Main app layout with header
│   │   ├── ProtectedRoute.jsx # Route protection
│   │   ├── Layout.css
│   ├── context/
│   │   └── AuthContext.jsx   # Auth state management
│   ├── pages/
│   │   ├── Auth.jsx          # Login/Signup pages
│   │   ├── Projects.jsx      # Projects listing
│   │   ├── ProjectDetail.jsx # Project tasks and members
│   │   ├── Dashboard.jsx     # Main dashboard
│   │   ├── *.css             # Page styles
│   ├── styles/
│   │   └── index.css         # Global styles
│   ├── api.js               # API client configuration
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Key Pages

### Login & Signup
- Email/password authentication
- Form validation
- Link between login and signup pages

### Projects
- List all user's projects
- Create new project with name and description
- Quick project info (member count, task count)
- Navigate to project details

### Project Detail
- View all project tasks
- Filter tasks by status
- Create new tasks with:
  - Title, description
  - Priority level (Low, Medium, High, Urgent)
  - Due date
  - Assignment
- Update task status (inline dropdown)
- Delete tasks
- View project members and their roles
- Delete project (owner only)

### Dashboard
- Overview of your task statistics:
  - Total tasks
  - Tasks by status
  - Overdue task count
- Recent tasks list
- Project completion progress
- Progress bars for each project
- Overdue task alerts

## API Integration

All API calls are configured through `src/api.js` with:
- Automatic JWT token injection
- Request/response interceptors
- Automatic logout on 401
- Error handling

### Available API Endpoints

**Authentication**
- POST `/api/auth/signup` - Register
- POST `/api/auth/login` - Login
- GET `/api/auth/profile` - Get user profile

**Projects**
- GET `/api/projects` - List projects
- POST `/api/projects` - Create project
- GET `/api/projects/:projectId` - Get project details
- PUT `/api/projects/:projectId` - Update project
- DELETE `/api/projects/:projectId` - Delete project

**Tasks**
- GET `/api/projects/:projectId/tasks` - List tasks
- POST `/api/projects/:projectId/tasks` - Create task
- PUT `/api/projects/:projectId/tasks/:taskId` - Update task
- DELETE `/api/projects/:projectId/tasks/:taskId` - Delete task

**Project Members**
- GET `/api/projects/:projectId/members` - List members
- POST `/api/projects/:projectId/members` - Add member
- DELETE `/api/projects/:projectId/members/:memberId` - Remove member

**Dashboard**
- GET `/api/dashboard` - Get dashboard statistics
- GET `/api/dashboard/project/:projectId` - Get project statistics

## Styling

Global styles are in `src/styles/index.css` with:
- CSS custom properties for theming
- Responsive grid/flex utilities
- Reusable component classes (.btn, .badge, .card, etc.)
- Mobile-first responsive design

## Authentication Flow

1. User signs up or logs in
2. Backend returns JWT token and user info
3. Token stored in localStorage
4. Token injected in all API requests via interceptor
5. On logout, token and user data cleared
6. Expired or invalid token triggers redirect to login

## Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tips

- Use React DevTools for debugging
- Check browser console for API errors
- API calls logged in network tab
- localStorage contains auth token for offline inspection

## Building for Production

```bash
npm run build
```

This creates optimized production build in `dist/` directory ready for deployment.

## Common Issues

**API Connection Failed**
- Ensure backend server is running on port 5000
- Check VITE_API_URL in .env.local
- Check CORS settings in backend

**Authentication Issues**
- Clear localStorage and try logging in again
- Check token expiration settings
- Verify JWT_SECRET matches between frontend and backend

**Page Not Loading**
- Check browser console for errors
- Verify all imports are correct
- Ensure component files exist in correct paths


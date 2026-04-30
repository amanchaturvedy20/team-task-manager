# Create database
psql -U postgres
CREATE DATABASE team_task_manager;
\q

# Start server
cd server
npm install
npm run seed     # Optional: creates sample data
npm run dev      # Server runs on http://localhost:5000# 🚀 Quick Start Guide

Follow these steps to get the Team Task Manager running in minutes!

## Prerequisites Check

Make sure you have these installed:
- **Node.js** (v16+) - Check with: `node --version`
- **MongoDB Account** (free at https://www.mongodb.com/cloud/atlas)

If not installed:
- Node.js: https://nodejs.org
- MongoDB Atlas: https://cloud.mongodb.com (free, no installation needed)

## Setup Steps

### Step 1: Get MongoDB Connection String

**Option A: Use Existing Connection String** ✅

If you already have a MongoDB Atlas connection string from the setup:
```
mongodb+srv://chaubeyaman2020_db_user:Aman@2020@cluster-team-task-manag.cf2tfuw.mongodb.net/?appName=Cluster-team-task-manager
```

This is already in `server/.env`

**Option B: Create Your Own** (if you don't have one)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (M0 free tier)
4. Get connection string from Dashboard → Connect → Drivers
5. Replace in `server/.env`

### Step 2: Start Backend Server (Terminal 1)

```powershell
cd server
npm install
npm run dev
```

**Expected output:**
```
MongoDB connection successful
Server running on port 5000
```

✅ Backend ready at: `http://localhost:5000`

### Step 3: Start Frontend (Terminal 2 - New Window)

```powershell
cd client
npm install
npm run dev
```

**Expected output:**
```
VITE v5.0.0  ready in xxx ms
➜  Local:   http://localhost:3000/
```

✅ Frontend ready at: `http://localhost:3000`

### Step 4: (Optional) Seed Sample Data

Keep backend running and run in ANOTHER terminal (Terminal 3):

```powershell
cd server
npm run seed
```

This creates sample projects and tasks with these demo accounts:
- alice@example.com / password123
- bob@example.com / password123
- admin@example.com / password123

## Open Application

Visit: **http://localhost:3000**

### Create Account or Login

If you ran the seed:
- Email: `alice@example.com`
- Password: `password123`

Otherwise:
- Click "Sign Up" and create a new account

## What You Can Do

✅ **Create Projects** - Organize your work
✅ **Create Tasks** - Break down work into tasks
✅ **Assign Tasks** - Give tasks to team members
✅ **Track Progress** - See what's done, in progress, or overdue
✅ **Manage Team** - Add/remove project members
✅ **Dashboard** - Get overview of all your tasks

## Key Features

### Projects Page
- View all your projects
- Create new projects
- Click project to manage tasks and members

### Project Detail
- Create tasks with priority and due date
- Change task status (drag/select)
- Add team members
- Delete project (owner only)

### Dashboard
- See all your task statistics
- View recent tasks
- Check project progress
- See overdue tasks

## Project Structure

```
team-task-manager/
├── server/          # Express.js REST API
├── client/          # React web app
├── README.md        # Full documentation
├── SETUP.md         # Detailed setup guide
└── QUICK_START.md   # This file
```

## Troubleshooting

### "Cannot connect to database"
1. Make sure PostgreSQL is running
2. Check database exists: `psql -U postgres -l | findstr team_task_manager`
3. Recreate if needed: `createdb team_task_manager`

### "Port 5000 already in use"
1. Change PORT in `server/.env` to 5001
2. Update VITE_API_URL in `client/.env.local` to `http://localhost:5001/api`

### "API not responding"
1. Check backend is running on Terminal 1
2. Verify frontend can reach backend via Network tab (DevTools)
3. Check CORS_ORIGIN in `server/.env`

### "Module not found"
```powershell
# Reinstall dependencies
cd server && npm install
cd ../client && npm install
```

## Stop the Application

- **Backend**: Press `Ctrl+C` in Terminal 1
- **Frontend**: Press `Ctrl+C` in Terminal 2

## Full Documentation

- Backend: Read `server/README.md`
- Frontend: Read `client/README.md`
- Setup: Read `SETUP.md`
- Main Docs: Read `README.md`

## Common Tasks

### Add a Team Member to Project
1. Go to project detail page
2. Click "Members" tab
3. Create account for person with signup
4. Add their email to project

### Change Task Status
1. Open project
2. Click task status dropdown
3. Select: Todo, In Progress, Completed, or Cancelled
4. Changes save instantly

### View Progress
1. Go to Dashboard
2. See stats: Total, Todo, In Progress, Completed, Overdue
3. View individual projects with progress bars

### Delete a Task
1. Open project
2. Click "Delete" button on task card
3. Confirm deletion

## Next Steps

Once everything is running:

1. **Explore the Application**
   - Create a test project
   - Create a few test tasks
   - Try different statuses

2. **Test Team Features**
   - Create another account
   - Add them to a project
   - Assign them a task

3. **Check Dashboard**
   - View your task stats
   - See project progress
   - Review recent tasks

4. **Customize** (Optional)
   - Modify colors in `client/src/styles/index.css`
   - Add more fields to tasks
   - Create new pages/features

## Need Help?

1. Check the terminal output for error messages
2. Look at browser console (F12) for frontend errors
3. Review the full documentation files
4. Check Network tab to see actual API requests

---

**Enjoy using Team Task Manager! 🎉**

Questions? Check the documentation or troubleshooting section above.


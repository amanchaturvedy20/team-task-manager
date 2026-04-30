# Team Task Manager - Setup Guide

This guide will help you set up and run the Team Task Manager application locally.

## Prerequisites

Make sure you have the following installed:
- **Node.js** v16 or higher - [Download](https://nodejs.org)
- **MongoDB Account** - Free tier at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** (optional) - [Download](https://git-scm.com)

## Step 1: Get MongoDB Connection String

### Option A: Use Provided Connection String

Your MongoDB Atlas connection string (provided):
```
mongodb+srv://chaubeyaman2020_db_user:Aman@2020@cluster-team-task-manag.cf2tfuw.mongodb.net/?appName=Cluster-team-task-manager
```

This is already configured in `server/.env` ✅

### Option B: Create Your Own MongoDB Account

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up with email address
3. Create a free M0 cluster
4. Create database user with username and password
5. Allow network access from 0.0.0.0 (anywhere)
6. Copy connection string from Dashboard
7. Update `server/.env` with your connection string

## Step 2: Setup Backend Server

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# The .env file is already configured, but you can customize it:
# .env file already exists with default values

# Optional: Seed sample data
npm run seed

# Start backend server (development mode with auto-reload)
npm run dev
```

**Backend will run on: http://localhost:5000**

Expected output when started:
```
MongoDB connection successful
Server running on port 5000
```

## Step 3: Setup Frontend (in a new terminal)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# The .env.local file is already configured
# Start frontend development server
npm run dev
```

**Frontend will run on: http://localhost:3000**

Expected output when started:
```
  VITE v5.0.0  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

## Step 4: Access the Application

Open your browser and go to:
```
http://localhost:3000
```

## Demo Accounts (if you ran npm run seed)

```
Account 1:
Email: alice@example.com
Password: password123

Account 2:
Email: bob@example.com
Password: password123

Account 3 (Admin):
Email: admin@example.com
Password: password123
```

## Quick Troubleshooting

### PostgreSQL Connection Failed

**Error:** `ECONNREFUSED` or cannot connect to database

**Solution:**
1. Verify MongoDB connection string in `server/.env`
2. Check network access in MongoDB Atlas:
   - Go to Security → Network Access
   - Should include 0.0.0.0 (allow from anywhere)
3. Verify database user credentials (username & password in connection string)
4. Test connection by starting server: `npm run dev`

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
- Change PORT in `server/.env` to another port (e.g., 5001)
- Update CORS_ORIGIN in `server/.env` if changing port
- Update VITE_API_URL in `client/.env.local`

### API Connection Failed from Frontend

**Error:** `Cannot POST /api/auth/login` or timeout

**Solution:**
1. Verify backend is running on port 5000
2. Check VITE_API_URL in `client/.env.local` matches backend URL
3. Check browser's Network tab for actual request URL
4. Verify CORS_ORIGIN in `server/.env` includes `http://localhost:3000`

### Module Not Found Errors

**Solution:**
```bash
# Clear node_modules and reinstall
cd server
rm -rf node_modules
npm install

cd ../client
rm -rf node_modules
npm install
```

## Development Workflow

### Backend Development

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

The server will auto-restart when you make changes to files in `src/`.

### Frontend Development

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

Frontend supports Hot Module Replacement (HMR) - changes appear instantly.

### Making API Calls

The frontend automatically injects JWT token from localStorage to all API requests. No manual setup needed.

## Testing the Application

### Basic Flow
1. Sign up for a new account
2. Create a project
3. Create tasks within the project
4. Assign tasks to team members
5. Update task status
6. View dashboard

### Role-Based Access Testing

Different roles control what users can do:
- **Project Owner**: Can create, update, delete project and manage members
- **Lead**: Can create and manage tasks
- **Member**: Can view and update their assigned tasks

## Production Notes

Before deploying to production:

1. **Change JWT Secret**
   ```env
   JWT_SECRET=generate_a_long_random_string_here
   ```

2. **Update MongoDB Connection**
   ```env
   MONGODB_URI=your_production_mongodb_atlas_connection_string
   ```

3. **Set CORS Origin**
   ```env
   CORS_ORIGIN=https://yourdomain.com
   ```

4. **Build Frontend**
   ```bash
   cd client
   npm run build
   ```

5. **Deploy to hosting** (Heroku, AWS, DigitalOcean, etc.)

## Project Structure

```
team-task-manager/
├── server/                    # Express.js backend
│   ├── src/
│   │   ├── config/           # Database & constants
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/       # Auth & validation
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API endpoints
│   │   ├── index.js          # Server entry
│   │   └── seed.js           # Sample data
│   ├── .env                  # Environment config
│   ├── package.json
│   └── README.md
│
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── context/          # Auth context
│   │   ├── pages/            # Page components
│   │   ├── styles/           # CSS styles
│   │   ├── api.js            # API client
│   │   ├── App.jsx           # Main component
│   │   └── main.jsx          # Entry point
│   ├── .env.local            # Frontend config
│   ├── index.html
│   ├── package.json
│   └── README.md
│
└── README.md
```

## API Documentation

See `server/README.md` for complete API endpoint documentation.

## Common Tasks

### Reset Database
```bash
cd server
# MongoDB: Just run seed again to clear and recreate data
npm run seed
```

### Add New API Endpoint
1. Create controller in `server/src/controllers/`
2. Create route in `server/src/routes/`
3. Add route to `server/src/index.js`
4. Create API call in `client/src/api.js`

### Deploy to Production
See each service's documentation:
- [Heroku Deployment](https://devcenter.heroku.com)
- [AWS Deployment](https://aws.amazon.com/getting-started)
- [DigitalOcean Deployment](https://docs.digitalocean.com)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review error messages in terminal/browser console
3. Check file paths are correct
4. Ensure all dependencies are installed
5. Verify environment variables are set correctly

## Next Steps

- Customize the UI in `client/src/components/` and `client/src/pages/`
- Add more features (comments, attachments, notifications)
- Set up CI/CD pipeline
- Configure database backups
- Set up monitoring and logging

Good luck! 🚀


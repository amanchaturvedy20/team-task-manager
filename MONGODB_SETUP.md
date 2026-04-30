# MongoDB Setup Guide for Team Task Manager

This guide explains how to set up MongoDB for the Team Task Manager application.

## Why MongoDB?

MongoDB is a NoSQL document database that offers:
- ✅ Flexible schema - Easy to modify data structure
- ✅ JSON-like documents - Natural fit for JavaScript/Node.js
- ✅ Cloud hosting - MongoDB Atlas provides free tier
- ✅ Easy scalability - Built for distributed systems
- ✅ Rich query language - Powerful aggregation pipeline

## What You Know

You already have a MongoDB Atlas connection string:
```
mongodb+srv://chaubeyaman2020_db_user:Aman@2020@cluster-team-task-manag.cf2tfuw.mongodb.net/?appName=Cluster-team-task-manager
```

This is already configured in `server/.env` ✅

## What Changed in the Code

### Models
- **Before**: Sequelize ORM with PostgreSQL
- **After**: Mongoose ODM with MongoDB
- **Benefits**: Simpler syntax, better for document storage

### Database Methods
- `Model.findByPk()` → `Model.findById()`
- `Model.findOne({ where: { ... } })` → `Model.findOne({ ... })`
- `Model.findAll()` → `Model.find()`
- `Model.create()` → `Model.create()`
- `Model.destroy()` → `Model.deleteOne()` or `Model.deleteMany()`

### Relationships
- **Before**: Foreign keys + explicit associations
- **After**: MongoDB ObjectId refs + `.populate()` for joining
- **Example**: 
  ```javascript
  // Get project with populated owner and members
  const project = await Project.findById(projectId)
    .populate('ownerId', 'firstName lastName email')
    .populate({
      path: 'members',
      populate: { path: 'userId', select: 'firstName lastName email' }
    });
  ```

### Data Validation
- MongoDB handles data types through Mongoose schemas
- Validation happens at the application layer (Joi)
- Relationships are enforced through refs and middleware

## Installation Steps

### 1. Install Dependencies

```bash
cd server
npm install
```

The `package.json` has been updated to use Mongoose instead of Sequelize.

### 2. MongoDB Connection String

The `.env` file already has your connection string configured:

```env
MONGODB_URI=mongodb+srv://chaubeyaman2020_db_user:Aman@2020@cluster-team-task-manag.cf2tfuw.mongodb.net/?appName=Cluster-team-task-manager
```

✅ Ready to use!

### 3. Seed Sample Data

```bash
npm run seed
```

This will:
- Connect to MongoDB
- Clear any existing data
- Create 3 test users
- Create 2 sample projects
- Create 5 sample tasks with proper relationships
- Display test accounts for login

### 4. Start the Server

```bash
npm run dev
```

Expected output:
```
MongoDB connection successful
Server running on port 5000
```

## MongoDB Atlas Features

Your MongoDB Atlas cluster includes:

- **Database Name**: (automatic, created on first write)
- **Collections**: Users, Projects, ProjectMembers, Tasks
- **Automatic Indexing**: Unique indexes on email, compound indexes on projectId+userId
- **Free Tier**: 512MB storage (perfect for development)
- **24/7 Monitoring**: Via Atlas dashboard
- **Automatic Backups**: Every 6 hours

## Common Operations

### View Your Data

1. Go to: https://cloud.mongodb.com
2. Login with your account
3. Click "Database" → "Collections"
4. Click "cluster-team-task-manager"
5. Browse collections: Users, Projects, etc.

### Backup Data

MongoDB Atlas handles automatic backups. You can also:
- Export data via MongoDB Compass
- Use `mongoexport` command-line tool
- Take on-demand snapshots in Atlas dashboard

### Monitor Performance

1. Go to Atlas Dashboard
2. Click "Database" → "Metrics"
3. View: Operations/sec, Data Size, Connection Count, etc.

## Troubleshooting

### Connection Failed

**Error**: Cannot connect to MongoDB

**Solutions**:
1. Check connection string in `.env` is correct
2. Verify network access in Atlas: 
   - Go to Security → Network Access
   - Should show access from "0.0.0.0" (anywhere)
3. Verify database user login:
   - Go to Security → Database Access
   - Username: chaubeyaman2020_db_user
   - Password: Aman@2020

### Seeding Failed

**Error**: Seeding script fails

**Solutions**:
```bash
# Restart MongoDB connection and try again
npm run seed

# Or clear data first
npm run dev  # This will auto-create indexes
# Then stop (Ctrl+C) and run seed
npm run seed
```

### Data Not Showing

**Error**: Collections don't appear in Atlas

**Solutions**:
1. Data is created on first write
2. Run seed script to populate: `npm run seed`
3. Check Network Access allows connections
4. Verify .env has correct `MONGODB_URI`

## API Compatibility

All REST endpoints work the same way:

```bash
# Example: Create a project
POST /api/projects
{
  "name": "My Project",
  "description": "Project description"
}

# Example: Create a task
POST /api/projects/PROJECT_ID/tasks
{
  "title": "Task title",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

The API response format is unchanged - same fields, same structure.

## Frontend Changes

✅ **No changes needed!**

The React frontend uses the same API, so all code remains unchanged:
- API calls work the same
- Authentication works the same
- All features work the same

## Performance Tips

### Indexing

MongoDB automatically indexes:
- `_id` (primary key)
- `unique` fields like email
- Compound indexes you define

To view indexes:
```bash
db.users.getIndexes()
```

### Query Performance

Use `.select()` to limit fields:
```javascript
const user = await User.findById(id).select('-password');
```

Use `.lean()` for read-only queries:
```javascript
const users = await User.find().lean();
```

### Connections

MongoDB maintains connection pool automatically:
- Default: 10 connections
- Configured in connection string
- Scales as needed

## Migration from PostgreSQL

If you had PostgreSQL data:

1. **Export PostgreSQL data** (SQL format)
2. **Convert to JSON** using your preferred tool
3. **Import to MongoDB**:
   ```bash
   mongoimport --collection users --file users.json
   ```

Since you're starting fresh, this isn't needed.

## Database Structure (Collections)

### Users Collection
```json
{
  "_id": ObjectId,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "hashed_password",
  "role": "member",
  "isActive": true,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### Projects Collection
```json
{
  "_id": ObjectId,
  "name": "Project Name",
  "description": "...",
  "ownerId": ObjectId (ref to User),
  "status": "active",
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### ProjectMembers Collection
```json
{
  "_id": ObjectId,
  "projectId": ObjectId (ref to Project),
  "userId": ObjectId (ref to User),
  "role": "member",
  "joinedAt": ISODate,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### Tasks Collection
```json
{
  "_id": ObjectId,
  "title": "Task Title",
  "description": "...",
  "projectId": ObjectId (ref to Project),
  "createdById": ObjectId (ref to User),
  "assignedToId": ObjectId (ref to User),
  "status": "todo",
  "priority": "high",
  "dueDate": ISODate,
  "completedAt": ISODate,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

## Development

### File Changes Summary

Files updated for MongoDB:
- ✅ `server/src/config/database.js` - Mongoose connection
- ✅ `server/src/models/*.js` - Mongoose schemas
- ✅ `server/src/controllers/*.js` - Mongoose methods
- ✅ `server/src/middleware/auth.js` - Updated queries
- ✅ `server/src/seed.js` - Mongoose seeding
- ✅ `server/.env` - MongoDB connection string
- ✅ `server/package.json` - Mongoose dependency

### No Changes Needed
- ✅ Frontend code (React)
- ✅ Route definitions
- ✅ API endpoints
- ✅ Authentication flow
- ✅ Validation schema

## Next Steps

1. **Start Backend**:
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Start Frontend** (in another terminal):
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Seed Data** (while backend is running):
   ```bash
   npm run seed
   ```

4. **Login**: Visit http://localhost:3000
   - Email: alice@example.com
   - Password: password123

## Support

### Common Issues

**Port 5000 in use**: Change PORT in `.env`

**Module not found**: Run `npm install` again

**API not responding**: Check backend is running in first terminal

**MongoDB says auth failed**: Verify password in connection string

### Resources

- Mongoose Docs: https://mongoosejs.com
- MongoDB Atlas: https://cloud.mongodb.com
- MongoDB Shell: https://www.mongodb.com/products/shell

---

Happy coding with MongoDB! 🚀


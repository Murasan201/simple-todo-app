# 📝 Simple Todo App

A modern, responsive todo application built with Next.js, TypeScript, and Tailwind CSS. Features user authentication, data persistence, and full CRUD operations for task management.

![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC.svg)

## ✨ Features

- 🔐 **User Authentication**: Secure email/password registration and login
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ✅ **Task Management**: Add, delete, and toggle completion status of tasks
- 💾 **Data Persistence**: Tasks are saved to database and persist across sessions
- 🔒 **Session Management**: Secure cookie-based authentication
- 🚀 **Modern Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS

## 🛠️ Technology Stack

- **Frontend**: Next.js 15.3.3 (App Router), React 19.0.0, TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Database**: Prisma ORM with PostgreSQL (Neon) / SQLite (local)
- **Authentication**: Custom session management with httpOnly cookies
- **Security**: bcryptjs for password hashing
- **Deployment**: Vercel (production), Local development with SQLite

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 16+ and npm
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Murasan201/simple-todo-app.git
cd simple-todo-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Local Environment (Automated)
```bash
# Automatic setup with SQLite database
npm run setup:local

# Start development server
npm run dev
```

### 4. Access the Application
Open [http://localhost:3000](http://localhost:3000) in your browser

### Manual Setup (Alternative)
```bash
# Copy SQLite schema for local development
cp prisma/schema.dev.prisma prisma/schema.prisma

# Generate Prisma client and create database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

## 🧪 Local Testing

### Test User Registration & Login
1. Navigate to `http://localhost:3000`
2. Click "新規登録" (Sign Up)
3. Enter email: `test@example.com` and password: `password123`
4. After registration, login with the same credentials

### Test Task Management
1. Add new tasks using the input field
2. Toggle completion status with checkboxes
3. Delete tasks using the delete button
4. Refresh page to verify data persistence

### Development Commands
```bash
# View database contents
npm run db:studio

# Reset database (clear all data)
npm run db:reset

# Run ESLint checks
npm run lint

# Build for production
npm run build
```

## 🌐 Production Deployment

### Prerequisites
- [Vercel Account](https://vercel.com)
- [PlanetScale Account](https://planetscale.com) (for MySQL database)

### 1. Prepare for Production
```bash
# Restore MySQL schema for production
cp prisma/schema.prod.prisma prisma/schema.prisma
```

### 2. Deploy to Vercel
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure environment variables in Vercel dashboard:

```env
DATABASE_URL="mysql://username:password@host/database_name"
NEXTAUTH_URL="https://your-app-domain.vercel.app"
NEXTAUTH_SECRET="your-production-secret-key"
NODE_ENV="production"
```

### 3. Set Up Neon Database
1. **Add Neon Integration via Vercel Marketplace**:
   - Go to Vercel Dashboard → Your Project
   - Navigate to Integrations → Browse Marketplace
   - Search for "Neon" and click "Add Integration"
   - Follow the setup wizard to create a free PostgreSQL database

2. **Alternative: Manual Neon Setup**:
   - Visit https://neon.tech and sign up with GitHub
   - Create a new project and database
   - Copy the connection string to `DATABASE_URL` in Vercel

3. **Initialize Database Schema**:
   - Access Neon Dashboard → SQL Editor
   - Run the initialization script:
   ```sql
   CREATE TABLE IF NOT EXISTS users (
       id SERIAL PRIMARY KEY,
       email VARCHAR(255) UNIQUE NOT NULL,
       "passwordHash" VARCHAR(255) NOT NULL,
       "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE IF NOT EXISTS tasks (
       id SERIAL PRIMARY KEY,
       "userId" INTEGER NOT NULL,
       title VARCHAR(255) NOT NULL,
       done BOOLEAN DEFAULT FALSE,
       "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
   );
   ```

### 4. Verify Deployment
- Test user registration and login
- Verify task management functionality
- Check responsive design on different devices

## 🌐 Accessing the Live Application

### Production URL
Once deployed to Vercel, your application will be available at:
- **Primary URL**: `https://simple-todo-app.vercel.app`
- **Alternative URL**: `https://simple-todo-app-[random-id].vercel.app`

### How to Find Your Application URL

#### Method 1: Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click on your **simple-todo-app** project
3. Click the **"Visit"** button or copy the displayed URL
4. The URL will be shown at the top of the project page

#### Method 2: Vercel CLI (if installed)
```bash
vercel --prod
```

#### Method 3: GitHub Repository
- Check the **"Environments"** section in your GitHub repository
- Look for the **"Production"** deployment link

### Testing the Live Application

Once you access the live URL, test these features:

#### 🔐 Authentication Test
1. **Sign Up**: Click "新規登録" (Sign Up)
   - Enter a valid email address
   - Create a strong password
   - Verify successful registration

2. **Sign In**: Use your registered credentials
   - Verify redirect to dashboard
   - Check session persistence

#### ✅ Task Management Test
1. **Add Tasks**: Create new todo items
2. **Toggle Completion**: Mark tasks as done/undone
3. **Delete Tasks**: Remove completed tasks
4. **Data Persistence**: Refresh page to verify data saves

#### 📱 Device Compatibility Test
- **Desktop**: Full feature access
- **Tablet**: Responsive layout
- **Mobile**: Touch-friendly interface

### 🔒 Security Features
- HTTPS encryption for all data transmission
- Secure password hashing with bcrypt
- HttpOnly cookies for session management
- Protected API endpoints with authentication

## 🚨 Troubleshooting

### Vercel Build Errors

#### Prisma Client Generation Error
**Error**: `Prisma has detected that this project was built on Vercel, which caches dependencies...`

**Solution**: 
1. Ensure `postinstall` script is added to package.json:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

2. Verify production schema is used:
```bash
cp prisma/schema.prod.prisma prisma/schema.prisma
```

3. Check Vercel environment variables:
```env
DATABASE_URL="mysql://username:password@host/database_name"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="secure-production-secret"
NODE_ENV="production"
```

#### Database Connection Issues
**Error**: `The table 'public.users' does not exist in the current database`

**Solution**:
1. **Check Neon Integration**: Ensure Neon is properly connected to your Vercel project
2. **Initialize Database Schema**: Run the SQL initialization script in Neon Dashboard → SQL Editor
3. **Verify Environment Variables**: Confirm `DATABASE_URL` is set in Vercel
4. **Manual Schema Deployment**: Run `npx prisma db push` locally if needed

#### Neon-Specific Issues
- **Free Tier Limits**: 512MB storage, 3GB transfer/month
- **Connection Pooling**: Neon automatically handles connections
- **Branch Database**: Ensure you're using the correct branch in Neon Dashboard

## 📋 Environment Variables

### Local Development (.env.local)
```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="local-development-secret"
NODE_ENV="development"
```

### Production (Vercel)
```env
DATABASE_URL="postgresql://username:password@host/database_name" # Automatically set by Neon integration
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="secure-production-secret"
NODE_ENV="production"
```

## 🗄️ Database Information

### Neon PostgreSQL (Production)
- **Service**: [Neon](https://neon.tech) - Serverless PostgreSQL
- **Free Tier**: 512MB storage, 3GB data transfer/month
- **Features**: 
  - Instant branching for development
  - Automatic scaling to zero
  - Point-in-time recovery
  - Built-in connection pooling

### Integration Benefits
- **One-click setup** via Vercel Marketplace
- **Automatic environment variables** configuration
- **No credit card required** for free tier
- **Seamless scaling** as your app grows

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Task Management Endpoints
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task (toggle completion)
- `DELETE /api/tasks/[id]` - Delete task

## 🔄 Version History

### Version 1.0.1 (2025-01-14) - Latest
#### 🐛 Bug Fixes
- **Fixed**: Missing `/api/auth/signup` endpoint causing registration failures
- **Fixed**: Added complete local testing infrastructure

#### ✨ New Features
- **Added**: Automated local development setup (`npm run setup:local`)
- **Added**: SQLite support for local development
- **Added**: Comprehensive testing documentation
- **Added**: Development commands for database management

#### 🔧 Improvements
- **Enhanced**: Local testing procedures with detailed checklist
- **Enhanced**: Error handling and troubleshooting guides
- **Enhanced**: Documentation with production deployment steps

### Version 1.0.0 (2025-01-14)
#### 🎉 Initial Release
- ✅ Complete Next.js + TypeScript + Tailwind CSS setup
- ✅ Custom authentication system with httpOnly cookies
- ✅ Prisma ORM with MySQL support (PlanetScale ready)
- ✅ Full task management CRUD operations
- ✅ Responsive UI design
- ✅ Production-ready build configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and test locally
4. Commit your changes: `git commit -m 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Local Testing Guide](LOCAL_TESTING.md)
2. Review the [Development Rules](CLAUDE.md)
3. Open an issue on GitHub

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Database management with [Prisma](https://prisma.io)
- Deployed on [Vercel](https://vercel.com)

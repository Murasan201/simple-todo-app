# Simple Todo App - Development Rules & Requirements

## Project Overview
- **Project Name**: Simple Todo App
- **Purpose**: Develop a responsive todo app with user authentication and data persistence, deployed on Vercel
- **Target Platform**: Web browsers (PC, smartphone, tablet)

## System Architecture
```
[Frontend (Next.js + React + Tailwind)]
          ⇅
    [API (Next.js API Routes)]
          ⇅
[DB (MySQL via PlanetScale + Prisma ORM)]
```

## Technology Stack (Version 1.0.0)
- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript 5.x
- **UI**: React 19.0.0 + Tailwind CSS 4.x
- **Authentication**: Custom session management with cookies
- **ORM**: Prisma 6.9.0
- **Database**: PlanetScale (MySQL compatible)
- **Deployment**: Vercel (Hobby plan)
- **Password Hashing**: bcryptjs 3.0.2

## Core Features
### Authentication
- Email + password signup/login
- Custom session management with httpOnly cookies

### Task Management
- Add tasks
- Delete tasks
- Toggle task completion status
- Database persistence (save/load)
- Real-time task list updates

### UI/UX
- Responsive design with Tailwind CSS
- Mobile and PC compatible layout
- Preview environment with preview URLs

## Database Schema
| Table | Columns | Types | Purpose |
|-------|---------|-------|---------|
| users | id, email, passwordHash | INT, VARCHAR, VARCHAR | User authentication |
| tasks | id, userId, title, done, createdAt | INT, INT, VARCHAR, BOOLEAN, DATETIME | Task information |

## API Endpoints
| Endpoint | Method | Function |
|----------|--------|----------|
| /api/auth/signup | POST | User registration |
| /api/auth/login | POST | Login |
| /api/auth/logout | POST | Logout |
| /api/auth/me | GET | Get current user info |
| /api/tasks | GET | Get user's tasks |
| /api/tasks | POST | Add task |
| /api/tasks/[id] | PUT | Update task (toggle completion) |
| /api/tasks/[id] | DELETE | Delete task |

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Security Requirements
- HTTPS enforcement
- Password hashing with bcrypt
- Environment variable encryption
- JWT token expiration settings

## Performance Requirements
- Initial load: under 2 seconds
- API response: under 200ms
- Monthly uptime: 99.9%+

## Testing Strategy
- Unit tests: Jest + React Testing Library
- E2E tests: Cypress
- API tests: Postman Collections

## Deployment & CI/CD
- GitHub ↔ Vercel integration (auto build/deploy on push)
- Preview environments for each branch

## Development History & Specification Changes

### Version 1.0.0 Implementation Notes (2025-01-14)

#### Major Specification Changes
1. **Authentication System**: 
   - **Original Plan**: NextAuth.js (Credentials Provider)
   - **Implemented**: Custom session management with cookies
   - **Reason**: NextAuth.js v4 compatibility issues with Next.js 15, NextAuth.js v5 breaking changes
   - **Solution**: Built custom authentication using httpOnly cookies and bcryptjs

2. **Database Relations**:
   - **Added**: PlanetScale-specific `relationMode = "prisma"` in schema
   - **Added**: Proper indexing for userId foreign key relationship
   - **Added**: Cascade delete for tasks when user is deleted

3. **API Route Handlers**:
   - **Updated**: Next.js 15 dynamic route parameter handling (async params)
   - **Added**: Proper error handling and validation
   - **Added**: User session verification for all protected endpoints

#### Technical Decisions
1. **Session Management**: Used cookies() from next/headers for server-side session handling
2. **Password Security**: bcryptjs with salt rounds for password hashing
3. **Type Safety**: Full TypeScript coverage with proper interface definitions
4. **Error Handling**: Consistent error responses across all API endpoints

#### Known Limitations (v1.0.0)
- Local storage offline support not implemented
- Task editing functionality not included
- No unit tests or e2e tests yet
- No task categorization or sorting features

#### Environment Setup Required
```env
# Required environment variables
DATABASE_URL="mysql://username:password@host:port/database_name"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NODE_ENV="development"
```

#### Database Migration Commands
```bash
# Generate Prisma client
npx prisma generate

# Deploy database schema (for production)
npx prisma db push

# View database in Prisma Studio
npx prisma studio
```

## Local Testing Procedures

### Prerequisites
Before testing locally, ensure you have Node.js and npm installed.

### 🚀 Quick Start (Automated Setup)
```bash
# 1. Automatic local environment setup
npm run setup:local

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:3000
```

### 🛠️ Manual Setup (Alternative)
```bash
# 1. Switch to SQLite schema for local testing
cp prisma/schema.dev.prisma prisma/schema.prisma

# 2. Generate Prisma client
npx prisma generate

# 3. Create database tables
npx prisma db push

# 4. Start development server
npm run dev
```

### 📋 Testing Checklist

#### 1. Basic Authentication Flow
- [ ] **User Registration**:
  - Navigate to http://localhost:3000
  - Click "新規登録" (Sign Up)
  - Enter email: `test@example.com` and password: `password123`
  - Verify redirect to sign-in page after successful registration

- [ ] **User Login**:
  - Enter registered email and password
  - Click "ログイン" (Login)
  - Verify redirect to dashboard at `/dashboard`

#### 2. Task Management Functionality
- [ ] **Add Task**:
  - Enter task title in input field
  - Click "追加" (Add) button
  - Verify task appears in list

- [ ] **Toggle Task Completion**:
  - Click checkbox next to task
  - Verify task style changes (strikethrough for completed)
  - Click again to toggle back

- [ ] **Delete Task**:
  - Click "削除" (Delete) button
  - Verify task is removed from list

- [ ] **Data Persistence**:
  - Add several tasks
  - Refresh page (F5)
  - Verify all tasks are still present

#### 3. UI/UX Testing
- [ ] **Responsive Design**:
  - Test on desktop (1920x1080)
  - Test on tablet (768x1024)
  - Test on mobile (375x667)
  - Verify layout adapts properly

- [ ] **Error Handling**:
  - Try login with wrong credentials
  - Verify error message displays
  - Try adding empty task
  - Verify validation works

#### 4. Session Management
- [ ] **Logout Functionality**:
  - Click "ログアウト" (Logout) button
  - Verify redirect to sign-in page
  - Try accessing `/dashboard` directly
  - Verify redirect to sign-in (protected route)

- [ ] **Session Persistence**:
  - Login successfully
  - Close browser tab
  - Reopen and navigate to localhost:3000
  - Verify automatic redirect to dashboard (session maintained)

### 🔧 Development Commands
```bash
# View database contents
npm run db:studio

# Reset database (clear all data)
npm run db:reset

# Run ESLint checks
npm run lint

# Build for production (test build process)
npm run build

# Start production build locally
npm run start
```

### 🗄️ Local Database
- **Type**: SQLite
- **Location**: `./prisma/dev.db`
- **Management**: Accessible via `npm run db:studio`
- **Reset**: Use `npm run db:reset` to clear all data

### 🚨 Common Issues & Solutions

#### Database Connection Error
```bash
# Regenerate Prisma client
npx prisma generate
npx prisma db push
```

#### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

#### Module Not Found Errors
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install
```

### 🔄 Switching Back to Production
After local testing, restore production database schema:
```bash
# Restore MySQL schema for production
cp prisma/schema.prod.prisma prisma/schema.prisma

# Or manually change provider in schema.prisma:
# datasource db {
#   provider = "mysql"
#   url      = env("DATABASE_URL")
#   relationMode = "prisma"
# }
```

### ✅ Test Completion Criteria
Local testing is complete when:
- All authentication flows work correctly
- All task management operations function properly
- UI is responsive across different screen sizes
- Data persists correctly after page refresh
- Error handling works as expected
- Build process completes without errors

## Vercel Deployment Issues & Solutions

### Prisma Build Error on Vercel

#### Problem
Vercel caches dependencies which prevents Prisma's auto-generation from being triggered, leading to build failures with the error:
```
Prisma has detected that this project was built on Vercel, which caches dependencies. 
This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. 
To fix this, make sure to run the `prisma generate` command during the build process.
```

#### Solution
Add a `postinstall` script to package.json to ensure Prisma client generation:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

#### Required Environment Variables for Vercel
Ensure these environment variables are set in your Vercel dashboard:
```env
DATABASE_URL="mysql://username:password@host:port/database_name"
NEXTAUTH_URL="https://your-app-domain.vercel.app"
NEXTAUTH_SECRET="your-production-secret-key"
NODE_ENV="production"
```

#### Schema Configuration
- **Local Development**: Use `prisma/schema.dev.prisma` (SQLite)
- **Production**: Use `prisma/schema.prod.prisma` (MySQL with PlanetScale)

Before deploying to production, ensure the main schema points to MySQL:
```bash
cp prisma/schema.prod.prisma prisma/schema.prisma
```

#### Version History
- **2025-01-15**: Fixed Vercel build error by adding postinstall script for Prisma client generation

## Accessing the Deployed Application

### Production Access
After successful Vercel deployment, the application is accessible at:

**Primary URL**: `https://simple-todo-app.vercel.app`

### Finding Your Application URL
1. **Vercel Dashboard Method**:
   - Visit https://vercel.com/dashboard
   - Select your `simple-todo-app` project
   - Click "Visit" button or copy the displayed URL

2. **GitHub Integration**:
   - Check "Environments" section in your GitHub repository
   - Look for "Production" deployment link

### Post-Deployment Testing Checklist
- [ ] **URL Access**: Verify application loads without errors
- [ ] **User Registration**: Test signup functionality with real email
- [ ] **Authentication**: Verify login/logout flow works correctly
- [ ] **Task Management**: Test add/delete/toggle completion features
- [ ] **Data Persistence**: Confirm tasks save properly to production database
- [ ] **Responsive Design**: Test on multiple devices and screen sizes
- [ ] **Security**: Verify HTTPS connection and secure cookie handling

### Production Environment Verification
- Database connectivity to PlanetScale MySQL
- Environment variables properly configured in Vercel
- Prisma client generation successful in build process
- All API endpoints responding correctly
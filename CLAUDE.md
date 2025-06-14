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
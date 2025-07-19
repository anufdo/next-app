# Next.js 15 Authentication System

A complete authentication system built with Next.js 15, Auth.js, Prisma ORM, and MySQL database.

## Features

- ✅ User registration with email and password
- ✅ User login with credentials
- ✅ Session management with JWT
- ✅ Route protection middleware
- ✅ Secure password hashing with bcrypt
- ✅ Protected dashboard and profile pages
- ✅ Responsive UI with Tailwind CSS
- ✅ TypeScript support
- ✅ Server-side authentication checks
- ✅ Client-side session management

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Auth.js (NextAuth.js v5)
- **Database**: MySQL with Prisma ORM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Password Hashing**: bcryptjs
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   

   Update `.env.local` with your values:
   ```
   DATABASE_URL="mysql://<username>:<password>@localhost:3306/<database>"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # Auth.js API routes
│   │   └── register/route.ts            # Registration API endpoint
│   ├── auth/error/page.tsx              # Authentication error page
│   ├── login/page.tsx                   # Login page
│   ├── register/page.tsx                # Registration page
│   ├── profile/page.tsx                 # User profile page
│   ├── layout.tsx                       # Root layout with providers
│   ├── page.tsx                         # Protected dashboard
│   └── providers.tsx                    # Session provider wrapper
├── components/
│   ├── ui/                              # Reusable UI components
│   ├── LoginForm.tsx                    # Login form component
│   ├── RegisterForm.tsx                 # Registration form component
│   └── Navigation.tsx                   # Navigation with auth state
├── lib/
│   ├── actions/auth.ts                  # Server actions for auth
│   ├── auth.ts                          # Auth.js configuration
│   ├── auth-utils.ts                    # Authentication utilities
│   └── validations.ts                   # Form validation helpers
├── prisma/
│   ├── schema.prisma                    # Database schema
│   └── migrations/                      # Database migrations
├── middleware.ts                        # Route protection middleware
└── .env.local                           # Environment variables
```

## Authentication Flow

### Registration
1. User visits `/register`
2. Fills out registration form (name, email, password, confirm password)
3. Server validates input and creates user with hashed password
4. Redirects to login page on success

### Login
1. User visits `/login`
2. Enters email and password
3. Auth.js validates credentials against database
4. Creates secure session on successful authentication
5. Redirects to protected dashboard

### Route Protection
- Middleware checks authentication status on every request
- Unauthenticated users are redirected to `/login`
- Authenticated users trying to access `/login` or `/register` are redirected to dashboard
- Protected routes require valid session

### Session Management
- JWT-based sessions for stateless authentication
- Session data includes user ID, email, and name
- Automatic session refresh and validation
- Secure session handling with HTTP-only cookies

## Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  accounts Account[]
  sessions Session[]
}
```

### Account Model
```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  // ... OAuth fields for future extensibility
}
```

### Session Model
```prisma
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
}
```

## Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **CSRF Protection**: Built-in CSRF protection with Auth.js
- **Secure Sessions**: HTTP-only cookies with secure flags
- **SQL Injection Prevention**: Prisma ORM with parameterized queries
- **XSS Protection**: React's built-in XSS protection
- **Route Protection**: Middleware-based authentication checks

## API Endpoints

### Authentication
- `GET/POST /api/auth/[...nextauth]` - Auth.js handlers
- `POST /api/register` - User registration

### Protected Routes
- `/` - Dashboard (requires authentication)
- `/profile` - User profile (requires authentication)

### Public Routes
- `/login` - Login page
- `/register` - Registration page
- `/auth/error` - Authentication error page

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL connection string | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | JWT signing secret | Yes |

## Development

### Database Management

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Reset database (development only)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio

# Generate Prisma client
npx prisma generate
```

### Testing Authentication

1. **Register a new user**:
   - Go to `/register`
   - Fill out the form
   - Should redirect to login on success

2. **Login with credentials**:
   - Go to `/login`
   - Enter registered email and password
   - Should redirect to dashboard on success

3. **Test route protection**:
   - Try accessing `/` without being logged in
   - Should redirect to `/login`

4. **Test logout**:
   - Click "Sign Out" in navigation
   - Should redirect to `/login`

## Deployment

### Environment Setup
1. Set production environment variables
2. Use a production database (PostgreSQL recommended)
3. Set secure `NEXTAUTH_SECRET`

### Database Migration
```bash
npx prisma migrate deploy
```

### Build and Start
```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

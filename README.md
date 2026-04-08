# AI Workout Planner

A full-stack web application that generates personalized workout plans using AI. Users can create accounts, authenticate securely, and receive AI-powered training plans tailored to their fitness goals.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **AI-Powered Plan Generation**: Generate personalized workout plans using OpenAI
- **Plan Management**: View, manage, and track your workout plans
- **Responsive UI**: Modern React interface with TailwindCSS
- **Database Persistence**: PostgreSQL database with Prisma ORM
- **Docker Support**: Easy containerized deployment with Docker Compose

## Tech Stack

### Frontend
- **React** 19.2 - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **React Query** - API state management
- **Axios** - HTTP client with interceptors
- **ESLint** - Code linting

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type-safe backend code
- **Prisma** - ORM for database operations
- **PostgreSQL** - Relational database
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **OpenAI API** - AI plan generation
- **Zod** - Schema validation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## Project Structure

```
ai-workout-planner/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── GeneratePlanForm.tsx
│   │   │   ├── PlanList.tsx
│   │   │   ├── PlanDetail.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── ...
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── usePlans.ts
│   │   │   └── ...
│   │   ├── services/                # API service functions
│   │   ├── api/                     # Axios configuration and interceptors
│   │   ├── types/                   # TypeScript type definitions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── server/                          # Express backend
│   ├── src/
│   │   ├── routes/                  # API route handlers
│   │   │   ├── auth.route.ts
│   │   │   ├── plan.route.ts
│   │   │   └── user.route.ts
│   │   ├── middlewares/             # Express middlewares
│   │   │   └── auth.middleware.ts
│   │   ├── lib/                     # Utility libraries
│   │   ├── index.ts                 # Server entry point
│   │   └── generated/               # Prisma generated types
│   │
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema
│   │   └── migrations/              # Database migrations
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml               # Docker services configuration
└── README.md                        # This file
```

## Prerequisites

- **Node.js** 18+ and npm
- **Docker & Docker Compose** (optional, for containerized setup)
- **OpenAI API Key** (for AI plan generation)
- **PostgreSQL** 15+ (or Docker)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-workout-planner
```

### 2. Set Up Environment Variables

**Server (.env or configure in docker-compose.yml):**
```
DATABASE_URL=
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=development
PORT=5000
```

**Client (.env.local):**
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Database Setup

**Option A: Using Docker Compose**
```bash
docker-compose up -d
```

**Option B: Local PostgreSQL**
```bash
# Create database
createdb ai_workout

# Run migrations
cd server
npm run setup
```

### 4. Install Dependencies

**Backend:**
```bash
cd server
npm install
npx prisma generate
npx prisma migrate deploy
```

**Frontend:**
```bash
cd client
npm install
```

## Running the Application

### Development Mode

**Backend:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5000`

**Frontend:**
```bash
cd client
npm run dev
```
Client runs on `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd server
npm run build
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

### Docker Compose

```bash
docker-compose up -d
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - Logout user

### Training Plans
- `GET /api/plans` - Get all user's plans (protected)
- `POST /api/plans` - Generate new plan (protected)
- `GET /api/plans/:id` - Get plan details (protected)
- `DELETE /api/plans/:id` - Delete plan (protected)

### User
- `GET /api/user/profile` - Get current user profile (protected)
- `PUT /api/user/profile` - Update profile (protected)

## Database Schema

### User
- `id` - Primary key
- `email` - Unique email
- `password` - Hashed password
- `name` - User's name
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

### TrainingPlan
- `id` - Primary key
- `userId` - Foreign key to User
- `title` - Plan title
- `description` - Plan description
- `duration` - Plan duration (weeks)
- `difficulty` - Difficulty level
- `content` - Plan content (JSON)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Authentication Flow

1. User registers or logs in
2. Server validates credentials and issues JWT token
3. Client stores token in localStorage/sessionStorage
4. Token included in Authorization header for protected requests
5. Server middleware validates token for each protected route
6. Token automatically refreshed on expiration

## Development

### Code Quality

**Linting (Frontend):**
```bash
cd client
npm run lint
npm run lint -- --fix
```

**TypeScript Checks:**
```bash
npm run build
```

### Database Migrations

**Create new migration:**
```bash
cd server
npx prisma migrate dev --name migration_name
```

**View database:**
```bash
npx prisma studio
```

## Workflow

1. Create a feature branch
2. Make changes and ensure tests pass
3. Run linter and fix issues
4. Commit with clear messages
5. Open a pull request with descriptions

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL is correct
- Verify database exists: `psql -l`

### Port Already in Use
- Change PORT in server .env
- Change Vite port: `npm run dev -- --port 5174`

### CORS Errors
- Verify frontend URL is in CORS whitelist
- Check credentials mode in Axios config

### OpenAI API Errors
- Verify API key is valid
- Check API usage and quota
- Ensure request format matches OpenAI spec

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/feature-name`
5. Submit a pull request

## License

This project is open source and available under the ISC License.

## Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Happy training! 💪**

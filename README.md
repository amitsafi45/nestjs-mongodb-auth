# NestJS Authentication & Authorization Service

A backend service using NestJS with role-based authentication, MongoDB, error handling, rate limiting, and throttling.

## Features

- **Role-Based Authentication**: JWT-based access control with roles like Admin, Member, and Super_Admin.
- **MongoDB Integration**: Stores user data.
- **Error Handling**: Centralized error management.
- **Rate Limiting & Throttling**: Prevents abuse.

## Endpoints

### Sign Up

**POST /auth/sign-up**  
Registers a user with an email, password, gender, and role.

**Request Body**:
```json
{
  "email": "string",
  "password": "string",
  "gender": "Male",  // or "Female"
  "role": [
    "Admin",        // or "Member", "Super_Admin"
    "Member",
    "Super_Admin"
  ]
}
```

**Responses**:
- `201 Created`: User created successfully.
- `400 Bad Request`: Validation error.

### Sign In / Login

**POST /auth/sign-in**
Authenticates and returns JWT tokens.

**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Responses**:
- `200 OK`: Tokens returned.
- `401 Unauthorized`: Invalid credentials.

## Environment Variables

Create a `.env` file with:

```env
PORT=3000
DB_URL=your_mongodb_connection_string
REFRESH_SECRET_KEY=your_refresh_secret_key
ACCESS_SECRET_KEY=your_access_secret_key
REFRESH_TOKEN_EXPIRES_IN=7d
ACCESS_TOKEN_EXPIRES_IN=1h
THROTTLE_TTL=60s
THROTTLE_LIMIT=100
```

## Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/amitsafi45/interview_task_backend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure `.env` and start the server:

   ```bash
   npm run start
   ```
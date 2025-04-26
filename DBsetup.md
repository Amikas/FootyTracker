Let me break this down into the absolute simplest approach, with detailed steps and screenshots/commands to verify each step:

# Simplest Setup Guide

## 1. Install PostgreSQL
- Download PostgreSQL from: https://www.postgresql.org/download/windows/
- During installation:
  - Remember the password you set for the 'postgres' (default user)
  - Default port is 5432, if you change it remember it

## 2. Verify PostgreSQL Installation
```bash
# Open Command Prompt or PowerShell and type:
psql -U postgres
# Enter the password you set during installation
```

If you see `postgres=#`, you're in! If not, common issues:
- "psql is not recognized as an internal or external command": PostgreSQL bin is not in PATH
- "Password authentication failed": Wrong password
- "Could not connect to server": PostgreSQL service not running

## 3. Get Your Database Credentials
When you're in PostgreSQL (`postgres=#` prompt):

```sql
-- Create your database
CREATE DATABASE footytracker;
```

## 4. Test Database Connection
```sql
-- Try connecting to your new database
\c footytracker

-- If you see "You are now connected to database "footytracker" as user <user>" - Perfect!
```

## 5. Set Up the Project
```bash
# Create .env file with your credentials in the root of the project
   DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/footytracker?schema=public"

   # Where:
   # USERNAME: postgres (or the user you created if it's the case)
   # PASSWORD: what you set during PostgreSQL installation
   # HOST: localhost (if running locally)
   # PORT: 5432 (default PostgreSQL port)
   # DATABASE: footytracker
```

## 6. Initialize Database
```bash
npx prisma generate
npx prisma db push
```

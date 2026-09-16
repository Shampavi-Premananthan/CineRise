# 🗄️ CineRise Database (M3)

This directory contains database documentation, schemas, and migrations for CineRise.

## Prisma Configuration

Prisma ORM is managed from the `backend/` directory:
- **Schema**: `backend/prisma/schema.prisma`
- **Migrations**: `backend/prisma/migrations/`
- **Seed script**: `backend/prisma/seed.ts`

## User Model Fields (Day 1)
- `id`: Unique identifier (`cuid`)
- `name`: Full name
- `email`: Unique email address
- `passwordHash`: Bcrypt hashed password
- `role`: `FILMMAKER` | `CREW` | `ORGANIZATION` | `ADMIN`
- `preferredLanguage`: e.g. `en`, `ta` (default: `en`)
- `profileImage`: URL to avatar image (optional)
- `status`: `ACTIVE` | `INACTIVE` | `SUSPENDED` (default: `ACTIVE`)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

## Useful Commands (Run inside `/backend`):
```bash
# Generate Prisma Client
npm run prisma:generate

# Apply migrations
npx prisma migrate dev

# Seed database with sample users
npm run prisma:seed
```

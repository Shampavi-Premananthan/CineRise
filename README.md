# 🎬 CineRise

CineRise is a platform connecting filmmakers with crew members, managing role applications, and discovering film festivals.

## 🛠️ Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express.js, REST API, JWT
- **Database:** PostgreSQL, Prisma ORM

## 📁 Folder Structure
- /frontend - Next.js React application
- /backend - Node.js Express server
- /database - Prisma schema, migrations, and seed scripts
- /docs - ERD, API Postman collections, and project plans

## 🚀 Getting Started

### 1. Clone the repository
`ash
git clone <your-github-repo-url>
cd CineRise
`

### 2. Frontend Setup
`ash
cd frontend
npm install
npm run dev
`

### 3. Backend Setup
`ash
cd backend
npm install
npm run dev
`

## 🌿 Git Branching Rules (IMPORTANT)
**Do not push directly to the main branch!**
1. Always create a new branch for your feature:
   git checkout -b feature/login-ui
2. Commit your changes:
   git commit -m "Added login UI"
3. Push to your branch:
   git push origin feature/login-ui
4. Create a **Pull Request (PR)** to the develop or main branch.

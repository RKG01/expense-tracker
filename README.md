# Expense Tracker

A full-stack personal finance tool for recording and reviewing expenses.

## Features

- Add new expenses with amount, category, description, and date
- View list of expenses
- Filter by category
- Sort by date (newest first)
- Display total of visible expenses
- Summary by category

## Tech Stack

### Backend
- Node.js with Express
- SQLite for persistence
- UUID for unique IDs

### Frontend
- React with Vite
- Fetch API for HTTP requests

## Design Decisions

- **Persistence**: Chose SQLite for simplicity and file-based storage, no need for external DB. Easy to deploy.
- **Idempotency**: Implemented request ID-based deduplication to handle retries correctly under network issues or page refreshes.
- **Money Handling**: Store amounts in cents (INTEGER) to avoid floating-point precision issues, convert to decimal for API responses.
- **Frontend State**: Managed state in React, refetch on add for simplicity. Could use optimistic updates.
- **Validation**: Comprehensive validation on both client and server (positive amounts, required fields, valid dates).
- **Styling**: Professional, clean UI with responsive design, focus on usability.

## Trade-offs

- No authentication, as it's personal tool.
- No pagination, assuming small number of expenses.
- No advanced error handling, basic try-catch.
- Tests: Basic integration tests added for API endpoints.
- No caching or offline support.

## Data Correctness & Edge Cases

- Amounts stored as integers (cents) to prevent precision errors.
- Idempotent POST requests via unique request IDs.
- Validation for positive amounts, required fields.
- Handles network failures with error states and loading indicators.
- Page refreshes handled by fetching data on load.

## What Not Done

- Advanced validation (e.g., date range limits).
- More comprehensive tests (unit tests for components).
- Authentication and multi-user support.
- Export/import functionality.
- Advanced filtering (date ranges).

## Setup

### Backend
cd backend
npm install
npm start

### Frontend
cd frontend
npm install
npm run dev

The frontend is configured to proxy `/expenses` to `http://localhost:3001` during development.

Frontend runs on http://localhost:5173, backend on http://localhost:3001.

## Deployment

### Deploy Backend (Railway/Vercel)

**Option 1: Railway (Recommended)**
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repo and the `backend` folder as root
4. Railway auto-detects Node.js and deploys
5. Get your backend URL from Railway dashboard (e.g., `https://your-app.railway.app`)

**Option 2: Heroku**
1. Install Heroku CLI
2. Run: `heroku create expense-tracker-api`
3. Run: `git push heroku main` (from backend folder)

### Deploy Frontend (Vercel)

1. Go to https://vercel.com
2. Click "Import Project" → Select GitHub repo
3. Set root directory to `frontend`
4. Add environment variable: `VITE_API_BASE=https://your-backend-url.railway.app`
5. Deploy!

### Environment Variables

**Frontend (.env.production)**
```
VITE_API_BASE=https://your-backend-url.railway.app
```

**Backend**
- `NODE_ENV=production` (set automatically on Railway/Vercel)
- `PORT` (set automatically, default 3001)

### Live URLs
- Frontend: Available from Vercel dashboard
- Backend: Available from Railway dashboard

## API

- POST /expenses: Create expense
- GET /expenses?category=food&sort=date_desc: Get expenses

## Updated Deployment Instructions

### Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Import Project" → "From GitHub"
3. Select your `expense-tracker` repository
4. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - **Name**: `VITE_API_BASE`
   - **Value**: Your backend URL (from Railway deployment)
6. Click "Deploy"

### Backend (Railway)
1. Go to [railway.app](https://railway.app) and sign up
2. Click "Create New" → "From GitHub Repo"
3. Select your `expense-tracker` repository
4. Configure:
   - **Root Directory**: `backend`
   - **Environment**: `NODE_ENV=production`
5. Click "Deploy"
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

## API

- POST /expenses: Create expense
- GET /expenses?category=food&sort=date_desc: Get expenses
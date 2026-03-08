# Vehicle Detection & Tracking System

Full-stack web application for **account + vehicle registration** and an **interactive vehicle tracking view** (simulated GPS path + speed) on a map.
Built as a React (Vite) SPA with a Node/Express REST API, MongoDB persistence, and cookie-based JWT authentication.

Live demo: `https://vehicle-detection-6tmy.vercel.app/`

- **End-to-end product flow**: sign up/login, email OTP verification, password reset, vehicle registration, and a tracking UI.
- **Security & backend fundamentals**: bcrypt password hashing, JWT auth in **HTTP-only cookies**, protected routes via middleware.
- **Full-stack integration**: React Context global state, Axios calls with credentials, Express routes + MongoDB models and references.
- **Deployment-ready concerns**: CORS allowlist, cross-site cookie settings (`SameSite=None` + `Secure` in production), Vite base path support.

## Features

- **Authentication**
  - Sign up / login
  - JWT session stored in **HTTP-only cookies**
  - Logout
- **Email verification (OTP)**
  - Send verification OTP via Nodemailer (Gmail SMTP)
  - Verify OTP with expiry handling
- **Password reset (OTP)**
  - Request reset OTP
  - Reset password after OTP validation
- **Vehicle module**
  - Register a vehicle (per user)
  - Check number plate existence (lookup API)
- **Tracking UI**
  - Map view using Leaflet / React-Leaflet
  - **Simulated** GPS movement (random polyline updates)
  - **Simulated** real-time speed readout
- **UI**
  - Tailwind-based layout + `react-toastify` notifications
  - Optional 3D scene via Spline

## Tech stack

- **Frontend**: React 19, Vite, React Router, Tailwind CSS, Axios, React-Toastify, React-Leaflet/Leaflet, Spline
- **Backend**: Node.js, Express, Mongoose, JWT (`jsonwebtoken`), bcrypt, cookie-parser, cors, dotenv, Nodemailer
- **Database**: MongoDB (Mongoose models + references)

## Architecture (high level)

- `user/` (React SPA)
  - Pages: `Home`, `Login`, `Emailverify`, `ResetPassword`, `Vehicle`, `VehicleMap`
  - Global app state via `AppContext` (`VITE_BACKEND_URL`, auth state, user data, tracked plate)
- `server/` (Express API)
  - Routes under `/api/*`
  - Auth middleware reads JWT from `req.cookies.token`
  - MongoDB models: `user` ↔ `vehicle` (user has a list of vehicle ObjectIds)

### Prerequisites

- Node.js (LTS recommended)
- A MongoDB connection string (MongoDB Atlas is fine)
- Gmail SMTP credentials (use a Gmail **App Password**)

### 1) Install dependencies

Install dependencies in **all three** folders:

```bash
npm install
cd server && npm install
cd ../user && npm install
```

### 2) Run the app

From the repo root:

```bash
npm run dev
```

This runs:
- Frontend at `http://localhost:5173`
- Backend at `http://localhost:4000` (default)


```text
Vehicle Detection/
  user/                 # React (Vite) frontend
  server/               # Express + MongoDB backend
  package.json          # Runs both with concurrently
```


# Tracking Module

- Leaflet map rendering
- Dynamic polyline path updates
- Simulated GPS movement
- Real-time speed generation
- Marker updates per interval


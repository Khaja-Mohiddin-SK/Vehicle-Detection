# Vehicle Detection & Tracking System — Full Stack Application

A full-stack vehicle registration and tracking platform built using React (Vite), Node.js, Express, MongoDB, and JWT authentication. 
The system allows users to register accounts, verify email via OTP, register vehicles, and track vehicle movement and speed on an interactive map.

This project demonstrates end-to-end full-stack development including authentication, secure APIs, database modeling, and frontend visualization.


# Key Features

✅ User Registration & Login  
✅ JWT Authentication (HTTP-only cookies)
✅ Email OTP Verification (Nodemailer) 
✅ Password Reset via OTP
✅ Vehicle Registration per User  
✅ Number Plate Lookup API 
✅ Vehicle Tracking Simulation  
✅ Real-time Speed Simulation 
✅ Interactive Map Tracking (Leaflet)  
✅ Protected Routes with Middleware
✅ MongoDB Schema Relationships 
✅ Spline 3D  


---

# Technical Highlights

- Secure password hashing using **bcrypt**
- JWT token authentication with cookie storage
- OTP generation & expiry handling
- Email delivery using **Nodemailer + Gmail SMTP**
- MongoDB relational referencing (User → Vehicles)
- Express middleware authorization layer
- React Context global auth state
- Map path rendering using **React Leaflet**
- Full frontend–backend API integration

---

# How to run 
Open an integarted terminal for the main folder Vehicle Detection and run: **npm run dev**

Here it runs the frontend(user) and Backend(server) both.

---
# THE Flow : 

HOME PAGE ( CLICK VDS LOGO TO NAVIAGTE HOME PAGE FROM ANY PAGE )

↓

REGISTER  →  EMAIL OTP  →  VERIFY ACCOUNT

↓

LOGIN → FORGOT PASSWORD  →  ENTER EMAIL  →  ENTER OTP  →  RESET PASSWORD → LOGIN AGAIN

↓

REGISTER VEHICLE DETAILS

↓

TRACK VEHICLE

↓

SHOWS TRACKING WITH RANDOM LOCATONS, PATH AND SPEED.

↓

LOGOUT  →  GO TO HOME  →  PAGE HOVER AT THE LETTER ICON ON TOP RIGHT ICON ( THE LETTER ICON IS YOUR FIRST LETTER FROM YOUR NAME WHICH YOU ENTER )  →  CLICK LOGOUT

---

# Tracking Module

- Leaflet map rendering
- Dynamic polyline path updates
- Simulated GPS movement
- Real-time speed generation
- Marker updates per interval


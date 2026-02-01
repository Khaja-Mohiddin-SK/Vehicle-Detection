import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import authVehicle from "./routes/vehicleRoutes.js";

const app = express();
const port = process.env.PORT || 4000
connectDB();

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin : allowedOrigins, credentials: true}));

app.get('/', (req, res) =>res.send("API is now Working excellent.."));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/vehicle', authVehicle)

app.listen(port, () => {
  console.log(`Server started on PORT:${port}`);
});

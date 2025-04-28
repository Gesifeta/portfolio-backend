import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import ServerlessHttp from "serverless-http";

import { userRouter } from "./routes/user.router.js";
import { skillRouter } from "./routes/skill.router.js";
import { projectRouter } from "./routes/project.router.js";
import { experienceRouter } from "./routes/experience.router.js";
import { educationRouter } from "./routes/education.router.js";
import { certificationRouter } from "./routes/certification.router.js";
import { badgeRouter } from "./routes/badge.router.js";
import { analyticsRouter } from "./routes/analytics.router.js";
import { serverRateLimit } from "./auth/middleware.js";

// Load environment variables
dotenv.config();
// Initialize express app
const app = express();
// Middleware
app.use("/", serverRateLimit);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      `${process.env.FRONTEND_URL}`,
      "http://localhost:5173",
      "http://localhost:3000",
      "https://gemechuadam.com",
      "https://680b6c763e4a5400088416e2--gemechuadam.netlify.app",
      "https://gemechuadam-backend.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
// set images folder as static
// In server.js
// Add this after your middleware configurations
// Create an 'uploads' directory to store images

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/images", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// user router
app.use("/api/", userRouter);
app.use("/api/", skillRouter);
app.use("/api/", projectRouter);
app.use("/api/", experienceRouter);
app.use("/api/", educationRouter);
app.use("/api/", certificationRouter);
app.use("/api/", badgeRouter);
app.use("/api/", analyticsRouter);
// Basic route
app.get("/api/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});
// set up response headers
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

export const handler = ServerlessHttp(app);

import rateLimit from "express-rate-limit";

import { verifyToken } from "./authentication.js";

// A middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "You are not logged in." });
  }
  try {
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
// middleware/rateLimit.js

export const serverRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

// image url middleware
export const imageUrlMiddleware = (req, res, next) => {
  if (JSON.parse(req.file)) {
    json.parse(req.body).image_url = JSON.parse(req.file).path;
  }
  next();
};

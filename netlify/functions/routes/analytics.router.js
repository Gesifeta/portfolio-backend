import express from "express";

import {
  getCountryAnalytics,
  trackCountryVisitor,
  trackCountryPageView,
  trackUserVisitor,
  getUserAnalytics,
} from "../controllers/analyticsController.js";
import { isAuthenticated } from "../auth/middleware.js";

export const analyticsRouter = express.Router();
analyticsRouter.post("/analytics/track", trackUserVisitor);
analyticsRouter.post("/analytics/track/country", trackCountryPageView);
analyticsRouter.get("/analytics/users", isAuthenticated, getUserAnalytics);
analyticsRouter.get(
  "/analytics/track/countries",
  isAuthenticated,
  getCountryAnalytics
);
analyticsRouter.post(
  "/analytics/track/country/visitor",

  trackCountryVisitor
);

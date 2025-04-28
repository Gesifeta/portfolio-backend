import express from "express";

import {
  getCountryAnalytics,
  trackCountryVisitor,
  trackCountryPageView,
  trackUserVisitor,
  getUserAnalytics,
} from "../controllers/analyticsController.js";

export const analyticsRouter = express.Router();
analyticsRouter.post("/analytics/track", trackUserVisitor);
analyticsRouter.post(
  "/analytics/track/country",

  trackCountryPageView
);
analyticsRouter.get("/analytics/users", getUserAnalytics);
analyticsRouter.get("/analytics/track/countries", getCountryAnalytics);
analyticsRouter.post(
  "/analytics/track/country/visitor",

  trackCountryVisitor
);

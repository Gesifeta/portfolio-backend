import express from "express";

import {
  getCountryAnalytics,
  trackCountryVisitor,
  trackCountryPageView,
  trackUserVisitor,
  getUserAnalytics,
} from "../controllers/analyticsController.js";

export const analyticsRouter = express.Router();
analyticsRouter.post("/analytics/track", express.json(), trackUserVisitor);
analyticsRouter.post(
  "/analytics/track/country",
  express.json(),
  trackCountryPageView
);
analyticsRouter.get("/analytics/users", getUserAnalytics);
analyticsRouter.get("/analytics/track/countries", getCountryAnalytics);
analyticsRouter.post(
  "/analytics/track/country/visitor",
  express.json(),
  trackCountryVisitor
);



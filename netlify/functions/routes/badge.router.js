import express from "express";

import {
  addNewBadge,
  getAllBadges,
  getBadgeById,
  getBadgeByUserId,
  updateBadge,
  deleteBadge,
} from "../controllers/badge.controller.js";
import { isAuthenticated } from "../auth/middleware.js";

export const badgeRouter = express.Router();
badgeRouter.post("/badges/new", express.json(), addNewBadge);
badgeRouter.get("/badges", getAllBadges);
badgeRouter.get("/badges/badge/:id", getBadgeById);
badgeRouter.get("/badges/badge/user/:id", isAuthenticated, getBadgeByUserId);
badgeRouter.put(
  "/badges/badge/update/:id",
  isAuthenticated,
  express.json(),
  updateBadge
);
badgeRouter.delete("/badges/badge/delete/:id", isAuthenticated, deleteBadge);

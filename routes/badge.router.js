import express from "express";

import {
  addNewBadge,
  getAllBadges,
  getBadgeById,
  getBadgeByUserId,
  updateBadge,
  deleteBadge,
} from "../controllers/badge.controller.js";

export const badgeRouter = express.Router();
badgeRouter.post("/badges/new", addNewBadge);
badgeRouter.get("/badges", getAllBadges);
badgeRouter.get("/badge/:id", getBadgeById);
badgeRouter.get("/badge/user/:id", getBadgeByUserId);
badgeRouter.put("badge/update/:id", updateBadge);
badgeRouter.delete("badge/delete/:id", deleteBadge);

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
badgeRouter.post("/badges/new", express.json(), addNewBadge);
badgeRouter.get("/badges", getAllBadges);
badgeRouter.get("/badge/:id", getBadgeById);
badgeRouter.get("/badge/user/:id", getBadgeByUserId);
badgeRouter.put("badge/update/:id", express.json(), updateBadge);
badgeRouter.delete("badge/delete/:id", deleteBadge);


import express from "express";

import { imageUrlMiddleware } from "../auth/middleware.js";

import {
  addNewBadge,
  getAllBadges,
  getBadgeById,
  getBadgeByUserId,
  updateBadge,
  deleteBadge,
  uploadBadgeImage,
} from "../controllers/badge.controller.js";
import { upload } from "../utils/upload.js";
import { isAuthenticated } from "../auth/middleware.js";

export const badgeRouter = express.Router();
badgeRouter.post("/badges/new",  addNewBadge);
badgeRouter.get("/badges", getAllBadges);
badgeRouter.get("/badges/badge/:id", getBadgeById);
badgeRouter.get("/badges/badge/user/:id", isAuthenticated, getBadgeByUserId);
badgeRouter.put(
  "/badges/badge/update/:id",
  isAuthenticated,

  updateBadge
);
badgeRouter.delete("/badges/badge/delete/:id", isAuthenticated, deleteBadge);
badgeRouter.post(
  "/badges/badge/upload",
  upload.single("file"),
  uploadBadgeImage
);

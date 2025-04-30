import express from "express";

import {
  getAllExperiences,
  addNewExperience,
  deleteExperience,
  updateExperience,
  getExperienceById,
  uploadExperienceImage,
  getExperienceByUserId,
  getExperienceByUserIdAndCompanyName,
  getExperienceByUserIdAndPosition,
} from "../controllers/experience.controller.js";
import { upload } from "../utils/upload.js";
import { isAuthenticated, imageUrlMiddleware } from "../auth/middleware.js";
// routes for the experiences
export const experienceRouter = express.Router();
experienceRouter.get("/experiences", getAllExperiences);
experienceRouter.post(
  "/experiences/new",
  isAuthenticated,
  upload.single("file"),
  imageUrlMiddleware,
  addNewExperience
);
experienceRouter.delete(
  "/experiences/delete/experience/:id",
  isAuthenticated,

  deleteExperience
);
experienceRouter.put(
  "/experiences/update/experience/:id",
  isAuthenticated,

  updateExperience
);
experienceRouter.get("/experiences/experience/:id", getExperienceById);
experienceRouter.post(
  "/experiences/experience/:id/upload",
  isAuthenticated,
  upload.single("file"),
  imageUrlMiddleware,
  uploadExperienceImage,
  updateExperience
);
// get experience by user id
experienceRouter.get("/experiences/experience/user/:id", getExperienceByUserId);
experienceRouter.get(
  "/experiences/experience/user/:id/company/:company",
  getExperienceByUserIdAndCompanyName
);
experienceRouter.get(
  "/experiences/experience/user/:id/position/:position",
  getExperienceByUserIdAndPosition
);

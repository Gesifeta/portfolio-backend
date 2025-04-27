import express from "express";

import {
  getAllExperiences,
  addNewExperience,
  deleteExperience,
  updateExperience,
  getExperienceById,
  uploadExperienceImage,
  getExperienceByUserId,
} from "../controllers/experience.controller.js";
import { isAuthenticated } from "../auth/middleware.js";
// routes for the experiences
export const experienceRouter = express.Router();
experienceRouter.get("/experiences", getAllExperiences);
experienceRouter.post(
  "/experiences/new",
  isAuthenticated,
  express.json(),
  addNewExperience
);
experienceRouter.delete(
  "/experiences/delete/experience/:id",
  isAuthenticated,
  express.json(),
  deleteExperience
);
experienceRouter.put(
  "/experiences/update/experience/:id",
  isAuthenticated,
  express.json(),
  updateExperience
);
experienceRouter.get("/experiences/experience/:id", getExperienceById);
experienceRouter.post(
  "/experiences/experience/:id/upload",
  isAuthenticated,
  express.json(),
  uploadExperienceImage,
  updateExperience
);
// get experience by user id
experienceRouter.get("/experiences/experience/user/:id", getExperienceByUserId);

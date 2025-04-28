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
// routes for the experiences
export const experienceRouter = express.Router();
experienceRouter.get("/experiences", getAllExperiences);
experienceRouter.post("/experiences/new", addNewExperience);
experienceRouter.delete("/experiences/:id", deleteExperience);
experienceRouter.put("/experiences/:id", updateExperience);
experienceRouter.get("/experiences/:id", getExperienceById);
experienceRouter.post(
  "/experiences/:id/upload",

  uploadExperienceImage,
  updateExperience
);
// get experience by user id
experienceRouter.get("/experiences/user/:id", getExperienceByUserId);

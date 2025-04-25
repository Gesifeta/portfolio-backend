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
experienceRouter.post("/experiences/new",express.json(), addNewExperience);
experienceRouter.delete("/experiences/:id", express.json(), deleteExperience);
experienceRouter.put("/experiences/:id", express.json(), updateExperience);
experienceRouter.get("/experiences/:id", getExperienceById);
experienceRouter.post(
  "/experiences/:id/upload",
  express.json(),
  uploadExperienceImage,
  updateExperience
);
// get experience by user id
experienceRouter.get("/experiences/user/:id", getExperienceByUserId);


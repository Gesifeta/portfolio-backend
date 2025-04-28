import express from "express";
import {
  addNewEducation,
  getAllEducations,
  getEducationById,
  deleteEducation,
  updateEducation,
} from "../controllers/education.controller.js";
import { isAuthenticated } from "../auth/middleware.js";

export const educationRouter = express.Router();
educationRouter.get("/educations", getAllEducations);
educationRouter.post(
  "/educations/new",
  isAuthenticated,

  addNewEducation
);
educationRouter.get("/educations/education/:id", getEducationById);
educationRouter.delete(
  "/educations/delete/education/:id",
  isAuthenticated,
  deleteEducation
);
educationRouter.put(
  "/educations/update/education/:id",
  isAuthenticated,

  updateEducation
);
educationRouter.get("/educations/education/user/:id", getEducationById);

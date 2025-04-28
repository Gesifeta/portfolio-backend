import express from "express";
import {
  addNewEducation,
  getAllEducations,
  getEducationById,
  deleteEducation,
  updateEducation,
} from "../controllers/education.controller.js";

export const educationRouter = express.Router();
educationRouter.get("/educations", getAllEducations);
educationRouter.post("/educations/new", addNewEducation);
educationRouter.get("/educations/:id", getEducationById);
educationRouter.delete("/educations/:id", deleteEducation);
educationRouter.put("/educations/:id", updateEducation);
educationRouter.get("/educations/user/:id", getEducationById);

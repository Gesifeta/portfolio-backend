
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
educationRouter.post("/educations/new", express.json(), addNewEducation);
educationRouter.get("/educations/:id", getEducationById);
educationRouter.delete("/educations/:id", deleteEducation);
educationRouter.put("/educations/:id", express.json(), updateEducation);
educationRouter.get("/educations/user/:id", getEducationById);

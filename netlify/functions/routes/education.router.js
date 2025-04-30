import express from "express";
import {
  addNewEducation,
  getAllEducations,
  getEducationById,
  deleteEducation,
  updateEducation,
  uploadEducationImage,
} from "../controllers/education.controller.js";
import { isAuthenticated, imageUrlMiddleware } from "../auth/middleware.js";
import { upload } from "../utils/upload.js";

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
educationRouter.post(
  "/educations/education/upload",
  upload.single("file"),
  imageUrlMiddleware,
  uploadEducationImage
);

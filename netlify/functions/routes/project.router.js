import express from "express";
import { upload } from "../utils/upload.js";
import { isAuthenticated, imageUrlMiddleware } from "../auth/middleware.js";

import {
  addNewProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  uploadProjectImage,
} from "../controllers/project.controller.js";

// project routes
export const projectRouter = express.Router();

projectRouter.post(
  "/projects/new",
  isAuthenticated,
  upload.single("file"),
  imageUrlMiddleware,
  addNewProject
);
projectRouter.get("/projects", getAllProjects);
projectRouter.get("/projects/project/:id", getProjectById);
// upload images using multer
projectRouter.put(
  "/projects/updateImageUrl/project/:id",
  isAuthenticated,
  upload.single("file"),
  uploadProjectImage
);

projectRouter.put(
  "/projects/update/project/:id",
  isAuthenticated,
  updateProject
);
projectRouter.delete(
  "/projects/delete/project/:id",
  isAuthenticated,
  deleteProject
);

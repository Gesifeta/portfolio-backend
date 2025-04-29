import express from "express";
import { upload } from "../utils/upload.js";
import { isAuthenticated } from "../auth/middleware.js";

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

  addNewProject
);
projectRouter.get("/projects", getAllProjects);
projectRouter.get("/projects/project/:id", getProjectById);
// upload images using multer
projectRouter.post(
  "/projects/upload",
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

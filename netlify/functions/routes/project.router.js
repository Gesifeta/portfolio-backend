import express from "express";
import multer from "multer";
import { fileStorageEngine } from "../utils/upload.js";
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

const upload = multer({ storage: fileStorageEngine });
projectRouter.post(
  "/projects/upload",
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

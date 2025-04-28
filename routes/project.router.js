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

projectRouter.post("/projects/new", addNewProject);
projectRouter.get("/projects", getAllProjects);
projectRouter.get("/projects/:id", getProjectById);
// upload images using multer

const upload = multer({ storage: fileStorageEngine });
projectRouter.post(
  "/projects/upload",

  upload.single("file"),
  uploadProjectImage
);

projectRouter.put("/projects/:id", updateProject);
projectRouter.delete("/project>.", deleteProject);

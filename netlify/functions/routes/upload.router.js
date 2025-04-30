import express from "express";

import { getImageUrl } from "../controllers/upload.controller.js";
import { upload } from "../utils/upload.js";
import { isAuthenticated } from "../auth/middleware.js";

export const uploadRouter = express.Router();
uploadRouter.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  getImageUrl
);

import express from "express";

import {
  addNewCertification,
  getAllCertifications,
  updateCertification,
  deleteCertification,
  getCertificationByUserId,
} from "../controllers/certification.controller.js";
import { isAuthenticated } from "../auth/middleware.js";

export const certificationRouter = express.Router();
certificationRouter.post(
  "/certifications/new",
  isAuthenticated,
  express.json(),
  addNewCertification
);
certificationRouter.get("/certifications", getAllCertifications);
certificationRouter.put(
  "/certifications/update/certification/:id",
  isAuthenticated,
  updateCertification
);
certificationRouter.delete(
  "/certifications/delete/certification/:id",
  isAuthenticated,
  deleteCertification
);
certificationRouter.get(
  "/certifications/certification/user/:id",
  getCertificationByUserId
);

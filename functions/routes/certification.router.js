import express from "express";

import {
  addNewCertification,
  getAllCertifications,
  updateCertification,
  deleteCertification,
  getCertificationByUserId,
} from "../controllers/certification.controller.js";

export const certificationRouter = express.Router();
certificationRouter.post(
  "/certifications/new",
  express.json(),
  addNewCertification
);
certificationRouter.get("/certifications", getAllCertifications);
certificationRouter.put(
  "/certifications/:id",
  updateCertification
);
certificationRouter.delete("/certifications/:id", deleteCertification);
certificationRouter.get("/certifications/user/:id", getCertificationByUserId);

import express from "express";
import {
  getAllSkills,
  getSkillById,
  addNewSkill,
  updateSkill,
  deleteSkill,
  getSkillsByUserId,
} from "../controllers/skill.controller.js";
import { isAuthenticated } from "../auth/middleware.js";

// routes for skills
export const skillRouter = express.Router();

skillRouter.get("/skills", getAllSkills);
skillRouter.post("/skills/new", isAuthenticated, express.json(), addNewSkill);
skillRouter.get("/skills/skill/:id", getSkillById);
skillRouter.put(
  "/skills/update/skill/:id",
  isAuthenticated,
  express.json(),
  updateSkill
);
skillRouter.delete("/skills/delete/skill/:id", isAuthenticated, deleteSkill);
skillRouter.get("/skills/skill/user/:id", getSkillsByUserId);

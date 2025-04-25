import express from "express";
import {
  getAllSkills,
  getSkillById,
  addNewSkill,
  updateSkill,
  deleteSkill,
  getSkillsByUserId,
} from "../controllers/skill.controller.js";

// routes for skills
export const skillRouter = express.Router();

skillRouter.get("/skills", getAllSkills);
skillRouter.post("/skills/new", express.json(), addNewSkill);
skillRouter.get("/skills/:id", getSkillById);
skillRouter.put("/skills/:id", express.json(), updateSkill);
skillRouter.delete("/skills/:id", deleteSkill);
skillRouter.get("/skills/user/:id", getSkillsByUserId);

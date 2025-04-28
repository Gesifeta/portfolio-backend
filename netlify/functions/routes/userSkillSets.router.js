import express from "express";

import {
  addNewSkillSet,
  updateSkillSetById,
  updateSkillSetsByUserId,
  updateSkillSetsBySkillId,
  deleteSkillSetById,
  deleteSkillSetsByUserId,
  deleteSkillSetsBySkillId,
  getSkillSetsByUserId,
  getSkillSetsBySkillId,
  getAllSkillSets,
} from "../controllers/userSkillSetsController.js";

// routes for user skill sets
export const userSkillSetsRouter = express.Router();
userSkillSetsRouter.post(
  "/user-skill-sets/new",
  express.json(),
  addNewSkillSet
);
userSkillSetsRouter.get("/user-skill-sets", getAllSkillSets);
userSkillSetsRouter.get("/user-skill-sets/user/:id", getSkillSetsByUserId);

userSkillSetsRouter.get("/user-skill-sets/skill/:id", getSkillSetsBySkillId);
userSkillSetsRouter.delete(
  "/user-skill-sets/delete/user/:id",
  deleteSkillSetsByUserId
);
userSkillSetsRouter.delete(
  "/user-skill-sets/delete/skill/:id",
  deleteSkillSetsBySkillId
);
userSkillSetsRouter.delete("/user-skill-sets/delete/:id", deleteSkillSetById);
userSkillSetsRouter.put(
  "/user-skill-sets/update/:id",
  express.json(),
  updateSkillSetById
);
userSkillSetsRouter.put(
  "/user-skill-sets/update/user/:id",
  express.json(),
  updateSkillSetsByUserId
);
userSkillSetsRouter.put(
  "/user-skill-sets/update/skill/:id",
  express.json(),
  updateSkillSetsBySkillId
);

import express from "express";

import {
  getAllUsers,
  registerUser,
  loginUser,
  getUserByEmail,
  getUserByUser_name,
  getUserByUser_nameOrEmail,
  getUserByUser_nameOrEmailOrPassword,
  getUserByUser_nameOrEmailOrPasswordOrId,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../auth/middleware.js";

export const userRouter = express.Router();
//register user route
userRouter.get("/user/auth", isAuthenticated);
userRouter.post("/users/register/new", express.json(), registerUser);
userRouter.post("/users/login", express.json(), loginUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/email/:email", getUserByEmail);
userRouter.get("/users/username/:username", getUserByUser_name);

userRouter.get(
  "/users/username/:username/email/:email",
  getUserByUser_nameOrEmail
);
userRouter.get(
  "/users/username/:username/email/:email/password/:password",
  getUserByUser_nameOrEmailOrPassword
);
userRouter.get(
  "/users/username/:username/email/:email/password/:password/id/:id",
  getUserByUser_nameOrEmailOrPasswordOrId
);

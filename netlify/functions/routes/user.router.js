import express from "express";

import {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  updateUserImage_url,
  getUserById,
  updateUser,
  deleteUser,
  updateUserPassword,
  updateUserEmail,
  updateUserUsername,
  getUserByEmail,
  getUserByUser_name,
  getUserByUser_nameOrEmail,
  getUserByUser_nameOrEmailOrPassword,
  getUserByUser_nameOrEmailOrPasswordOrId,
} from "../controllers/user.controller.js";
import { upload } from "../utils/upload.js";
import { isAuthenticated, imageUrlMiddleware } from "../auth/middleware.js";

export const userRouter = express.Router();
//register user route
userRouter.get("/user/auth", isAuthenticated);
userRouter.post(
  "/users/register/new",

  registerUser
);
userRouter.post("/users/login", loginUser);
userRouter.get("/users", isAuthenticated, getAllUsers);
userRouter.get("/users/user/email/:email", isAuthenticated, getUserByEmail);
userRouter.get(
  "/users/user/username/:username",
  isAuthenticated,
  getUserByUser_name
);
userRouter.get("/users/user/id/:id", isAuthenticated, getUserById);
userRouter.put(
  "/users/user/id/:id/update",
  isAuthenticated,
  upload.single("file"),
  imageUrlMiddleware,
  updateUser
);
userRouter.put(
  "/users/user/id/:id/update/password",
  isAuthenticated,

  updateUserPassword
);
userRouter.put(
  "/users/user/id/:id/update/email",
  isAuthenticated,

  updateUserEmail
);
userRouter.put(
  "/users/user/id/:id/update/username",
  isAuthenticated,

  updateUserUsername
);
userRouter.put(
  "/users/user/id/:id/update/image",
  isAuthenticated,
  upload.single("file"),
  imageUrlMiddleware,
  updateUserImage_url
);
userRouter.delete("/users/user/id/:id/delete", isAuthenticated, deleteUser);
userRouter.get("/users/logout", isAuthenticated, logoutUser);
userRouter.get("/users/user/id/:id", isAuthenticated, getUserById);
userRouter.get(
  "/users/user/username/:username/email/:email",
  isAuthenticated,
  getUserByUser_nameOrEmail
);
userRouter.get(
  "/users/user/username/:username/email/:email/password/:password",
  isAuthenticated,
  getUserByUser_nameOrEmailOrPassword
);
userRouter.get(
  "/users/user/username/:username/email/:email/password/:password/id/:id",
  isAuthenticated,
  getUserByUser_nameOrEmailOrPasswordOrId
);

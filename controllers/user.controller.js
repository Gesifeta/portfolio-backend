import { v4 as uuidv4 } from "uuid";

import {
  generateSalt,
  generateToken,
  hashPassword,
  comparePassword,
} from "../auth/authentication.js";

import { ordinaryDatabaseQuery } from "../database/db.js";
import { doesItExist } from "../validation/search.js";

// function to register user
export const registerUser = async (req, res) => {
  try {
    const {
      user_name,
      email,
      password,
      first_name,
      last_name,
      image_url,
      bio,
    } = req.body;
    // check if user is already registered

    if (await doesItExist(email, "users")) {
      return res.json({
        error: "Email is arlead registered",
        message: "If you forget your password please reset.",
      });
    }
    // generate salt
    const salt = generateSalt();
    // hash password
    const hashedPassword = hashPassword(password, salt);

    const queryString = `INSERT INTO users (id, user_name, first_name, last_name, email, password, image_url, bio) VALUES ($1, $2, $3, $4,$5, $6, $7, $8)  RETURNING id, first_name, last_name, email, image_url`;
    const params = [
      uuidv4(),
      user_name,
      first_name,
      last_name,
      email,
      hashedPassword,
      image_url,
      bio,
    ];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "User not created",
        error: "Unexpected error occured, and user not created",
      });
    }
    // generate token
    const token = generateToken({
      id: result.rows[0].id,
      email: result.rows[0].email,
      first_name: result.rows[0].first_name,
      last_name: result.rows[0].last_name,
      image_url: result.rows[0].image_url,
    });
    // set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 1000,
      sameSite: "none",
      path: "/",
    });
    // navigate to login

    return res.json({
      success: "Successfuly regigestered",
      user: {
        id: result.rows[0].id,
        role: result.rows[0].role,
        image_url: result.rows[0].image_url,
      },
    });
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// function to login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate email and password
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
        error: "Invalid credentials",
      });
    }
    // check if user is registered
    const queryString = `SELECT * FROM users WHERE email = $1`;
    const params = [email];
    const result = (await ordinaryDatabaseQuery(queryString, params)).rows[0];
    if (!result) {
      return res.status(401).json({
        message: "If your are not registered, please register to continue.",
        error: "Invalid credentials",
      });
    }
    // check if password match
    if (comparePassword(password, result.password)) {
      // generate token
      const token = generateToken({
        id: result.id,
        email: result.email,
        first_name: result.first_name,
        last_name: result.last_name,
        role: result.role,
        image_url: result.image_url,
      });
      // set token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 1000,
        sameSite: "lax",
        path: "/",
      });

      return res.json({
        message: "User logged in successfully",
        user: {
          id: result.id,
          role: result.role,
          image_url: result.image_url,
        },
      });
    }
    return res.status(401).json({
      message: "Invalid credentials",
      error: "Invalid credentials",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};

// function to get user by id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM users WHERE id = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {}
};
// function to get all users
export const getAllUsers = async (req, res) => {
  try {
    const queryString = `SELECT * FROM users`;
    const result = await ordinaryDatabaseQuery(queryString);
    return res.json(result.rows);
  } catch (error) {}
};
// function to update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, email, password } = req.body;
    const queryString = `UPDATE users SET user_name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`;
    const params = [user_name, email, password, id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {}
};
// function to delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `DELETE FROM users WHERE id = $1 RETURNING *`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {}
};
//update users image by user id
export const updateUserImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image_url } = req.body;
    const queryString = `UPDATE users SET image_url = $1 WHERE id = $2 RETURNING *`;
    const params = [image_url, id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {}
};
//update user's role 
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const queryString = `UPDATE users SET role = $1 WHERE id = $2 RETURNING *`;
    const params = [role, id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {}
};
// update user status
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const queryString = `UPDATE users SET status = $1 WHERE id = $2 RETURNING *`;
    const params = [status, id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {}
};
// update users image by email

export const updateUserImageByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const { image_url } = req.body;
    const queryString = `UPDATE users SET image_url = $1 WHERE email = $2 RETURNING *`;
    const params = [image_url, email];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {}
};

// function to get user by email
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const queryString = `SELECT * FROM users WHERE email = $1`;
    const params = [email];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {}
};
// function to get user by user_name
export const getUserByUser_name = async (req, res) => {
  try {
    const { user_name } = req.params;
    const queryString = `SELECT * FROM users WHERE user_name = $1`;
    const params = [user_name];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {}
};
// function to get user by user_name or email
export const getUserByUser_nameOrEmail = async (req, res) => {
  try {
    const { user_nameOrEmail } = req.params;
    const queryString = `SELECT * FROM users WHERE user_name = $1 OR email = $1`;
    const params = [user_nameOrEmail];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {}
};
// function to get user by user_name or email or password
export const getUserByUser_nameOrEmailOrPassword = async (req, res) => {
  try {
    const { user_nameOrEmailOrPassword } = req.params;
    const queryString = `SELECT * FROM users WHERE user_name = $1 OR email = $1 OR password = $1`;
    const params = [user_nameOrEmailOrPassword];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {}
};
// function to get user by user_name or email or password or id
export const getUserByUser_nameOrEmailOrPasswordOrId = async (req, res) => {
  try {
    const { user_nameOrEmailOrPasswordOrId } = req.params;
    const queryString = `SELECT * FROM users WHERE user_name = $1 OR email = $1 OR password = $1 OR id = $1`;
    const params = [user_nameOrEmailOrPasswordOrId];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {}
};

import { v4 as uuidv4 } from "uuid";
import { ordinaryDatabaseQuery } from "../database/db.js";
import multer from "multer";

// A function to post new project
export const addNewProject = async (req, res) => {
  try {
    const {
      id = uuidv4(),
      title,
      user_id,
      description,
      category,
      technologies,
      live_url,
      github_url,
      image_url,
    } = JSON.parse(req.body);
    const queryString = `INSERT INTO projects (id, title,user_id, description, category, technologies, live_url, github_url, image_url) VALUES ($1, $2, $3, $4, $5,$6, $7,$8,$9) RETURNING *`;
    const params = [
      id,
      title,
      user_id,
      description,
      category,
      technologies,
      live_url,
      github_url,
      image_url,
    ];
    const result = await ordinaryDatabaseQuery(queryString, params);
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};

// Function definitions
export const getAllProjects = async (req, res) => {
  try {
    const queryString = `SELECT * FROM projects`;
    const result = await ordinaryDatabaseQuery(queryString);
    if (result.rowCount === 0) {
      return res.json({
        message: "No categories found",
      });
    }
    return res.json(result.rows);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// delete projects

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `DELETE FROM projects WHERE id = $1 RETURNING *`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No project found",
      });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// get project by id
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM projects WHERE id = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No project found",
      });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      user_id,
      description,
      category,
      technologies,
      live_url,
      image_url,
      github_url,
    } = JSON.parse(req.body);
    const queryString = `UPDATE projects SET title = $1, description = $2, category = $3, technologies = $4, live_url = $5, github_url = $6, image_url = $7 WHERE id = $8 RETURNING *`;
    const params = [
      title,
      user_id,
      description,
      category,
      technologies,
      live_url,
      github_url,
      image_url,
      id,
    ];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No project found",
      });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
//upload image
export const uploadProjectImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        message: "No file uploaded",
      });
    }
    const { id } = req.body;
    const { path } = req.file;
    const queryString = `UPDATE projects SET image_url =$1 WHERE id=$2 RETURNING image_url`;
    const params = [path, id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    return res.json(path);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};

import express from "express";
import { ordinaryDatabaseQuery } from "../database/db.js";

const educationRoutes = express.Router();
// A function to add new education
export async function addNewEducation(req, res) {
  try {
    const {
      id,
      user_id,
      institution,
      school_name,
      field_of_study,
      specialization,
      level,
      name_of_award,
      grade,
      start_year,
      end_year,
    } = json.parse(req.body);
    const queryString = `INSERT INTO educations (id, user_id, institution, school_name, field_of_study, specialization, level, name_of_award, grade, start_year, end_year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
    const params = [
      id,
      user_id,
      institution,
      school_name,
      field_of_study,
      specialization,
      level,
      name_of_award,
      grade,
      start_year,
      end_year,
    ];
    const result = await ordinaryDatabaseQuery(queryString, params);
    return res.json(result.rows);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
}

// A function to get all educations
export async function getAllEducations(req, res) {
  try {
    const queryString = `SELECT * FROM educations`;
    const result = await ordinaryDatabaseQuery(queryString, []);
    return res.json(result.rows);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
}

// A function to get education by id
export async function getEducationById(req, res) {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM educations WHERE id = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No education found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
}

// A function to get education by user id
export async function getEducationByUserId(req, res) {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM educations WHERE user_id = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No education found" });
    }
    return res.json(result.rows);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
}

// A function to update education
export async function updateEducation(req, res) {
  try {
    const { id } = req.params;
    const {
      institution,
      school_name,
      field_of_study,
      specialization,
      level,
      name_of_award,
      grade,
      start_year,
      end_year,
    } = json.parse(req.body);
    const queryString = `UPDATE educations SET  school_name = $1, field_of_study = $2, specialization = $3, level = $4, name_of_award = $5, grade = $6, start_year = $7, end_year = $8, institution = $9 WHERE id = $10 RETURNING *`;
    const params = [
      school_name,
      field_of_study,
      specialization,
      level,
      name_of_award,
      grade,
      start_year,
      end_year,
      institution,
      id,
    ];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No education found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
}

// A function to delete education
export async function deleteEducation(req, res) {
  try {
    const { id } = req.params;
    const queryString = `DELETE FROM educations WHERE id = $1 RETURNING *`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No education found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
}
export default educationRoutes;

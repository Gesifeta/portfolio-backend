import { ordinaryDatabaseQuery } from "../database/db.js";

// Route for getting all the skills
export const getAllSkills = async (req, res) => {
  try {
    const queryString = `SELECT * FROM skills`;
    const result = await ordinaryDatabaseQuery(queryString);
    if (result.rowCount === 0) {
      return res.json({
        message: "No skills found",
      });
    }
    // Return the skills
    return res.json(result.rows);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// Route for getting a skill by id
export const getSkillById = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM skills WHERE id = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No skill found",
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
// Route for creating a skill
export const addNewSkill = async (req, res) => {
  try {
    const { name, level, user_id } = JSON.parse(req.body);
    const queryString = `INSERT INTO skills (name, level, user_id) VALUES ($1, $2, $3) RETURNING *`;
    const params = [name, level, user_id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// Route for updating a skill
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level } = JSON.parse(req.body);
    const queryString = `UPDATE skills SET name = $1, level = $2 WHERE id = $3 RETURNING *`;
    const params = [name, level, id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No skill found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// Route for deleting a skill
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `DELETE FROM skills WHERE id = $1 RETURNING *`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No skill found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};

// Route for getting all the skills by user id
export const getSkillsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM skills WHERE user_id = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No skills found",
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

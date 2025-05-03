import { ordinaryDatabaseQuery } from "../database/db.js";

// add new skill sets with user id
export const addNewSkillSet = async (req, res) => {
  try {
    const { user_id, skill_id } = JSON.parse(req.body);
    const queryString = `INSERT INTO user_skill_sets (id, user_id, skill_id) VALUES ($1, $2, $3) RETURNING *`;
    const params = [uuid_generate_v4(), user_id, skill_id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// get all skill sets
export const getAllSkillSets = async (req, res) => {
  try {
    const queryString = `SELECT * FROM user_skill_sets`;
    const result = await ordinaryDatabaseQuery(queryString, []);
    if (result.rowCount === 0) {
      return res.json({
        message: "No skill sets found",
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
// get skill sets by user id
export const getSkillSetsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `SELECT skills.id, user_skill_sets.id, name, category,
    description, image_url FROM skills JOIN user_skill_sets ON skills.id = user_skill_sets.skill_id 
    WHERE user_skill_sets.user_id = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No skill sets found",
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
// get skill sets by skill id
export const getSkillSetsBySkillId = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM user_skill_sets WHERE skill_id = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No skill sets found",
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
// delete skill sets by user id
export const deleteSkillSetsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `DELETE FROM user_skill_sets WHERE user_id = $1 RETURNING *`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No skill sets found",
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
// delete skill sets by skill id
export const deleteSkillSetsBySkillId = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `DELETE FROM user_skill_sets WHERE skill_id = $1 RETURNING *`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No skill sets found",
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
// delete skill sets by id
export const deleteSkillSetById = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `DELETE FROM user_skill_sets WHERE id = $1 RETURNING *`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No skill sets found",
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
// update skill sets by user id
export const updateSkillSetsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const { skill_id } = JSON.parse(req.body);
    const queryString = `UPDATE user_skill_sets SET skill_id = $1 WHERE user_id = $2 RETURNING *`;
    const params = [skill_id, id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No skill sets found",
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
// update skill sets by skill id
export const updateSkillSetsBySkillId = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = JSON.parse(req.body);
    const queryString = `UPDATE user_skill_sets SET user_id = $1 WHERE skill_id = $2 RETURNING *`;
    const params = [user_id, id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No skill sets found",
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
// update skill sets by id
export const updateSkillSetById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, skill_id } = JSON.parse(req.body);
    const queryString = `UPDATE user_skill_sets SET user_id = $1, skill_id = $2 WHERE id = $3 RETURNING *`;
    const params = [user_id, skill_id, id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No skill sets found",
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

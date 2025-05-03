import { ordinaryDatabaseQuery } from "../database/db.js";

// Add new experiences
export const addNewExperience = async (req, res) => {
  try {
    const {
      id,
      user_id,
      position,
      responsibilities,
      company_name,
      city,
      country,
      start_year,
      end_year,
      image_url,
    } = json.parse(req.body);
    const queryString = `INSERT INTO experiences (id, user_id, position, company_name, city, country,  start_year, end_year, image_url, responsibilities) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )  RETURNING *`;
    const params = [
      id,
      user_id,
      position,
      company_name,
      city,
      country,
      start_year,
      end_year,
      image_url,
      responsibilities,
    ];
    const result = await ordinaryDatabaseQuery(queryString, params);
    return res.json(result.rows);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// Get all experiences
export const getAllExperiences = async (req, res) => {
  try {
    const queryString = `SELECT * FROM experiences WHERE visible = 'true' ORDER BY end_year`;
    const result = await ordinaryDatabaseQuery(queryString, []);
    return res.json(result.rows);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// Get experience by id
export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM experiences WHERE id = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No experience found",
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
// Update experience
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user_id,
      position,
      company_name,
      city,
      country,
      start_year,
      end_year,
      image_url,
    } = json.parse(req.body);
    const queryString = `UPDATE experiences SET user_id = $1, position = $2, company_name = $3, city = $4, country = $5, start_year = $6, end_year = $7, image_url = $8 WHERE id = $9 RETURNING *`;
    const params = [
      user_id,
      position,
      company_name,
      city,
      country,
      start_year,
      end_year,
      image_url,
      id,
    ];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No experience found",
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
// Delete experience
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `DELETE FROM experiences WHERE id = $1 RETURNING *`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No experience found",
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
// upload image
export const uploadExperienceImage = async (req, res) => {
  try {
    if (!JSON.parse(req.file)) {
      return res.json({
        message: "No file uploaded",
      });
    }

    const { id, image_url } = json.parse(req.body);

    const queryString = `UPDATE experiences SET image_url =$1 WHERE id=$2 RETURNING image_url`;
    const params = [image_url, id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    return res.json(path);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// get experience by user id
export const getExperienceByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM experiences WHERE user_id = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No experience found",
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
// get experience by user id and company name
export const getExperienceByUserIdAndCompanyName = async (req, res) => {
  try {
    const { id, company_name } = req.params;
    const queryString = `SELECT * FROM experiences WHERE user_id = $1 AND company_name = $2`;
    const params = [id, company_name];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No experience found",
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
// get experience by user id and position
export const getExperienceByUserIdAndPosition = async (req, res) => {
  try {
    const { id, position } = req.params;
    const queryString = `SELECT * FROM experiences WHERE user_id = $1 AND position = $2`;
    const params = [id, position];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({
        message: "No experience found",
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

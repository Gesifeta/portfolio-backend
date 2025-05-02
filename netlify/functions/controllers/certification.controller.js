import { ordinaryDatabaseQuery } from "../database/db.js";

// a function to add new certifications
export const addNewCertification = async (req, res) => {
  try {
    const {
      id,
      user_id,
      title,
      category,
      description,
      certification_number,
      certification_link,
      awarded_by,
      awarded_date,
      expiration_date,
      image_url,
      icon_url,
    } = JSON.parse(req.body);
    const queryString = `INSERT INTO certifications (id, user_id, title, category, description, certification_number, certification_link, awarded_by, awarded_date, expiration_date, image_url, icon_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;
    const params = [
      id,
      user_id,
      title,
      category,
      description,
      certification_number,
      certification_link,
      awarded_by,
      awarded_date,
      expiration_date,
      image_url,
      icon_url,
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
// A fucntion to get all certifications
export const getAllCertifications = async (req, res) => {
  try {
    const queryString = `SELECT * FROM certifications`;
    const result = await ordinaryDatabaseQuery(queryString, []);
    return res.json(result.rows);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// A function to get certification by id
export const getCertificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM certifications WHERE id = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No certification found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// A function to get certification by user id
export const getCertificationByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM certifications WHERE user_id = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No certification found" });
    }
    return res.json(result.rows);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// A function to update certification
export const updateCertification = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      certification_number,
      certification_link,
      awarded_by,
      awarded_date,
      expiration_date,
      image_url,
      icon_url,
    } = JSON.parse(req.body);
    const queryString = `UPDATE certifications SET title = $1, description = $2, certification_number = $3, certification_link = $4, awarded_by = $5, awarded_date = $6, expiration_date = $7, image_url = $8, icon_url = $9 WHERE id = $10 RETURNING *`;
    const params = [
      title,
      description,
      certification_number,
      certification_link,
      awarded_by,
      awarded_date,
      expiration_date,
      image_url,
      icon_url,
      id,
    ];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No certification found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// A function to delete certification
export const deleteCertification = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `DELETE FROM certifications WHERE id = $1 RETURNING *`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No certification found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// upload certification image
export const uploadCertificationImage = async (req, res) => {
  try {
    const { id, image_url } = JSON.parse(req.body);
    const queryString = `UPDATE certifications SET image_url = $1 WHERE id = $2 RETURNING *`;
    const params = [image_url, id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No certification found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};

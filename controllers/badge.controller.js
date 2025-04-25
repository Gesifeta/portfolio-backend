import { ordinaryDatabaseQuery } from "../database/db.js";

// A function to add  new badge
export const addNewBadge = async (req, res) => {
  try {
    const {
      id,
      user_id,
      title,
      description,
      skills,
      badge_link,
      awarded_by,
      awarded_date,
      image_url,
    } = req.body;
    const queryString = `INSERT INTO badges (id, user_id, title, description, skills, badge_link, awarded_by, awarded_date, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    const params = [
      id,
      user_id,
      title,
      description,
      skills,
      badge_link,
      awarded_by,
      awarded_date,
      image_url,
    ];
    const result = await ordinaryDatabaseQuery(queryString, params);
    return res.json(result.rows);
  } catch (error) {
    console.log(error);
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// A function to get all badges
export const getAllBadges = async (req, res) => {
  try {
    const queryString = `SELECT * FROM badges`;
    const result = await ordinaryDatabaseQuery(queryString, []);
    return res.json(result.rows);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// A function to get badge by id
export const getBadgeById = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM badges WHERE id = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No badge found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// A function to get badge by user id
export const getBadgeByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `SELECT * FROM badges WHERE user_id = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No badge found" });
    }
    return res.json(result.rows);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// A function to update badge
export const updateBadge = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      badge_link,
      awarded_by,
      awarded_date,
      image_url,
    } = req.body;
    const queryString = `UPDATE badges SET title = $1, description = $2, badge_link = $3, awarded_by = $4, awarded_date = $5, image_url = $5  WHERE id = $7 RETURNING *`;
    const params = [
      title,
      description,
      badge_link,
      awarded_by,
      awarded_date,
      image_url,
      id,
    ];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No badge found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};
// A function to delete badge
export const deleteBadge = async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `DELETE FROM badges WHERE id = $1 RETURNING *`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rowCount === 0) {
      return res.json({ message: "No badge found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.json({
      error: error.message,
      message: "Unexpected error occured",
    });
  }
};

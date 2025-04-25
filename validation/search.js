import { ordinaryDatabaseQuery } from "../database/db.js";

export async function doesItExist(id, entity) {
  try {
    console.log("Reached does it exist")
    const queryString = `SELECT * FROM users WHERE email = $1`;
    const params = [id];
    const result = await ordinaryDatabaseQuery(queryString, params);
    if (result.rows.length === 0) {
      console.log(false)
      return false;
    }
    return true;
  } catch (error) {
    return error;
  }
}

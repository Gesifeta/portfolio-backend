// utils/cleanup.js
import { ordinaryDatabaseQuery } from "../database/db";
export const cleanOldLogs = async (req, res) => {
  try {
    // Keep only last 30 days of data
    await ordinaryDatabaseQuery.query(`
      DELETE FROM visitor_logs 
      WHERE timestamp < NOW() - INTERVAL '30 days'
    `);
  } catch (error) {
    console.error("Cleanup error:", error);
  } finally {
    ordinaryDatabaseQuery().release();
  }
};

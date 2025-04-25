import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
// A function to connect to the database

const { Pool } = pg;
const pool = new Pool({
  user:
    process.env.NODE_ENV === "production"
      ? process.env.DB_USER_PROD
      : process.env.DB_USER_DEV,
  host:
    process.env.NODE_ENV === "production"
      ? process.env.DB_HOST_PROD
      : process.env.DB_HOST_DEV,
  database:
    process.env.NODE_ENV === "production"
      ? process.env.DB_NAME_PROD
      : process.env.DB_NAME_DEV,
  password:
    process.env.NODE_ENV === "production"
      ? process.env.DB_PASSWORD_PROD
      : process.env.DB_PASSWORD_DEV,
  port:
    process.env.NODE_ENV === "production"
      ? process.env.DB_PORT_PROD
      : process.env.DB_PORT_DEV,
  ssl: {
    rejectUnauthorized: false,
    sslmode: process.env.NODE_ENV === "production",
  },
  // set timeout
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// for ordinary queries
export const ordinaryDatabaseQuery = async (queryString, params) =>{
  return await pool.query(queryString, params);
}
  
// for transactions
export const transactionDatabaseQuery = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};
// OR
export const getPool = () => pool;

// Add a method to close the pool
export const closePool = async () => {
  await pool.end();
};

import pool from "../configs/database/config_db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

async function registerUser(req) {
  const { name, password } = req.body;
  const created_at = new Date();
  const id = crypto.randomUUID();
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const client = await pool.connect();

  const hash = await bcrypt.hash(password, saltRounds);
  const result = await client.query(
    "INSERT INTO users (id, name, password, created_at) VALUES ($1::VARCHAR(36), $2::VARCHAR(50), $3::VARCHAR(255), $4::TIMESTAMP)",
    [id, name, hash, created_at]
  );
  client.release();
  return result;
}

async function loginUser(req) {
  const { name, password } = req.body;
  const client = await pool.connect();

  const user = await client.query("SELECT * FROM users WHERE name = $1::VARCHAR(50)", [name]);
  if(user.rowCount === 0) {
    throw new Error("User not found");
  }
  const match = await bcrypt.compare(password, user.rows[0].password);
  if(!match) {
    throw new Error("Invalid Password");
  }
  const last_login = new Date();
  const result = await client.query("UPDATE users SET last_login = $1::TIMESTAMP WHERE name = $2::VARCHAR(50)", [last_login, name]);
  client.release();
  return result;
}

export const userService = {
  registerUser,
  loginUser,
};

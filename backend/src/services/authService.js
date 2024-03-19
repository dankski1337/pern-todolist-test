import pool from "../configs/database/config_db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

async function registerUser(req, res) {
  const { name, password } = req.body;
  const created_at = new Date();
  const id = crypto.randomUUID();
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const client = await pool.connect();

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const result = await client.query(
      "INSERT INTO users (id, name, password, created_at) VALUES ($1::VARCHAR(36), $2::VARCHAR(50), $3::VARCHAR(255), $4::TIMESTAMP)",
      [id, name, hash, created_at]
    );

    if (result !== null) {
      res.status(201).json({
        message: "User registered successfully",
        data: result.rows[0],
      });
    }
  } catch (err) {
    if (err.code === "23505") {
      res.status(400).json({
        message: "Username already exists",
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  } finally {
    client.release();
  }
}

export const userService = {
  registerUser,
};

// TODO: REMOVE RESPONSES AND USE THROW ERRORS INSTEAD

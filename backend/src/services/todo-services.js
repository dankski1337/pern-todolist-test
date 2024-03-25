import pool from "../configs/database/config-db.js";

async function createTodo(id_user, title, description) {
  const client = await pool.connect();
  const created_at = new Date();

  const result = await client.query(
    "INSERT INTO todo_list (id_user, title, description, created_at) VALUES ($1::VARCHAR(36), $2::VARCHAR(50), $3::TEXT, $4::TIMESTAMP)",
    [id_user, title, description, created_at]
  );
  client.release();
  return result;
}

async function getTodos(id_user) {
  const client = await pool.connect();

  const results = await client.query(
    "SELECT * FROM todo_list WHERE id_user = $1::VARCHAR(36)",
    [id_user]
  );
  client.release();
  return results;
}

async function getTodo(id_user, id_todo) {
  const client = await pool.connect();

  const result = await client.query(
    "SELECT * FROM todo_list WHERE id_user = $1::VARCHAR(36) AND id_todo = $2::INT",
    [id_user, id_todo]
  );
  client.release();
  return result;
}

export const todoListService = {
  createTodo,
  getTodos,
  getTodo,
};

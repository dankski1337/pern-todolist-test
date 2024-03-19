import Express from "express";
import pool from "./src/configs/database/config_db.js";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
const app = Express();
const port = process.env.PORT || 3000;

app.use(Express.json());

app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// TODOS : IMPLEMENT COOKIES AND SESSIONS OR JWT USING PASSPORT
// TODOS : IMPLEMENT MIDDLEWARES SUCH AS BODY PARSER, CORS, HELMET, MORGAN, ETC
// TODOS : CREATE ERROR HANDLING MIDDLEWARES
// TODOS : LOGGER MIDDLEWARES USING WINSTON
// TODOS : IMPLEMENT TESTING USING JEST AND SUPERTEST

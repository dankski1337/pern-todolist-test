import Express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import errorHandler from "./src/middleware/errorHandlingMiddleware.js";
import bodyparser from "body-parser";

dotenv.config();
const app = Express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(Express.json());

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// TODO : IMPLEMENT COOKIES AND SESSIONS OR JWT
// TODO : IMPLEMENT MIDDLEWARES SUCH AS BODY PARSER, CORS, HELMET, MORGAN, ETC
// TODO : LOGGER MIDDLEWARES USING WINSTON
// TODO : IMPLEMENT TESTING USING JEST AND SUPERTEST
// TODO : ADD DOCUMENTATION

import Express from "express";
import errorHandler from "./src/middlewares/error-handling-middleware.js";
import bodyparser from "body-parser";
import verifyToken from "./src/middlewares/auth-jwt.js";
import authRoutes from "./src/routes/auth-routes.js";
import todoListRoutes from "./src/routes/todo-list-routes.js";

const app = Express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(Express.json());

// public routes
app.use("/api/v1/auth", authRoutes);

// private routes
app.use("/api/v1/todo", verifyToken, todoListRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// TODO : IMPLEMENT COOKIES AND SESSIONS OR JWT
// TODO : IMPLEMENT MIDDLEWARES SUCH AS BODY PARSER, CORS, HELMET, MORGAN, ETC
// TODO : LOGGER MIDDLEWARES USING WINSTON
// TODO : IMPLEMENT TESTING USING JEST AND SUPERTEST
// TODO : ADD DOCUMENTATION

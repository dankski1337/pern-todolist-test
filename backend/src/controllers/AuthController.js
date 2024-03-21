import { userService } from "../services/authService.js";
import { responseError } from "../error/responseError.js";

async function registerUser(req, res, next) {
  try {
    if (!req.body.name || !req.body.password) {
      throw new responseError("Invalid input", 400);
    }
    await userService.registerUser(req);
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    if (err.code == 23505) {
      next(new responseError("Name already exists", 409));
    } else {
      next(err);
    }
  }
}

async function loginUser(req, res, next) {
  try {
    if (!req.body.name || !req.body.password) {
      throw new responseError("Invalid input", 400);
    }
    await userService.loginUser(req);
    res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (err) {
    if (err.message === "User not found" || err.message === "Invalid Password") {
      next(new responseError("Invalid username or password", 401));
    } else {
      next(err);
    }
  }
}

// TODO: Implement other functions such as login, logout, etc
// TODO: COOKIES OR TOKENS FOR AUTHENTICATION

export const AuthController = {
  registerUser,
  loginUser,
};

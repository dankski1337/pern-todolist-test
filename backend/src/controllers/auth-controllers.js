import { authService } from "../services/auth-services.js";
import { responseError } from "../error/response-error.js";
import jwt from "jsonwebtoken";

async function registerUser(req, res, next) {
  try {
    if (!req.body.name || !req.body.password) {
      throw new responseError("Invalid input", 400, false);
    }
    await authService.registerUser(req);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      username: req.body.name,
    });
  } catch (err) {
    // postgres error code for unique constraint violation
    if (err.code == 23505) {
      next(new responseError("Name already exists", 409, false));
    } else {
      next(err);
    }
  }
}

async function loginUser(req, res, next) {
  try {
    if (!req.body.name || !req.body.password) {
      throw new responseError("Invalid input", 400, false);
    }
    let result = await authService.loginUser(req);

    // Generate jwt
    const token = jwt.sign({ id_user: result.id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      username: req.body.name,
      token: token
    });

  } catch (err) {
    if (err.message === "User not found" || err.message === "Invalid Password") {
      next(new responseError("Invalid username or password", 401, false));
    } else {
      next(err);
    }
  }
}

// TODO: Implement other functions such as login, logout, etc
// TODO: COOKIES OR TOKENS FOR AUTHENTICATION

export const authController = {
  registerUser,
  loginUser,
};

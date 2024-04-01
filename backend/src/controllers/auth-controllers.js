import { authService } from "../services/auth-services.js";
import { responseError } from "../error/response-error.js";
import jwt from "jsonwebtoken";

async function registerUser(req, res, next) {
  try {
    const name = req.body.name;
    const password = req.body.password;
    if (!name || !password) {
      throw new responseError("Invalid input", 400, false);
    }
    await authService.registerUser(name, password);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      name: name,
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
    const name = req.body.name;
    const password = req.body.password;
    if (!name || !password) {
      throw new responseError("Invalid input", 400, false);
    }
    const result = await authService.loginUser(name, password);

    // Generate jwt
    const token = jwt.sign({ id_user: result.id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      name: name,
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

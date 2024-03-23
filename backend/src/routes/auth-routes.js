import Express from "express";
import { authController } from "../controllers/auth-controllers.js";

const router = Express.Router();

router.post("/register", async (req, res, next) => {
  await authController.registerUser(req, res, next);
});

router.post("/login", async (req, res, next) => {
    await authController.loginUser(req, res, next);
})

export default router;


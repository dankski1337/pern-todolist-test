import Express from "express";
import { AuthController } from "../controllers/AuthController.js";

const router = Express.Router();

router.post("/register", async (req, res, next) => {
  await AuthController.registerUser(req, res, next);
});

router.post("/login", async (req, res, next) => {
    await AuthController.loginUser(req, res, next);
})

export default router;


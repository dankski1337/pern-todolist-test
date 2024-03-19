import Express from "express";
import { AuthController } from "../controllers/AuthController.js";

const router = Express.Router();

router.post("/register", async (req, res) => {
    await AuthController.registerUser(req, res);
});

export default router;
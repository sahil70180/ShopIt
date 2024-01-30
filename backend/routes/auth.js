import express from "express"
import { login, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(login);

export default router;

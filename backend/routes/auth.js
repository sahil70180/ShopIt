import express from "express"
import cookieParser from "cookie-parser";
import { login, registerUser } from "../controllers/authController.js";

const router = express.Router();


router.route("/register").post(registerUser)
router.route("/login").post(login);

export default router;

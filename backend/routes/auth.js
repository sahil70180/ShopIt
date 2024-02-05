import express from "express"
import { forgotPassword, getUseProfile, login, logout, registerUser, resetPassword, updatePassword, updateUserProfile } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticated, getUseProfile);
router.route("/me/update").put(isAuthenticated, updateUserProfile);
router.route("/password/update").put(isAuthenticated, updatePassword);
export default router;

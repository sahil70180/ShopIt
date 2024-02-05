import express from "express"
import { allUsers, forgotPassword, getUseProfile, getUserDetails, login, logout, registerUser, resetPassword, updatePassword, updateUserProfile } from "../controllers/authController.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticated, getUseProfile);
router.route("/me/update").put(isAuthenticated, updateUserProfile);
router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/admin/users").get(isAuthenticated, authorizeRoles('admin'), allUsers);
router.route("/admin/users/:id").get(isAuthenticated, authorizeRoles('admin'), getUserDetails);
export default router;

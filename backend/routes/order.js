import express from "express"
import { newOrder } from "../controllers/orderController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/orders/new").post(isAuthenticated, newOrder);

export default router;
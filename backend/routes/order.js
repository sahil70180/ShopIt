import express from "express"
import { getOrderDetails, myOrders, newOrder } from "../controllers/orderController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/orders/new").post(isAuthenticated, newOrder);
router.route("/orders/:id").get(isAuthenticated, getOrderDetails);
router.route("/me/orders").get(isAuthenticated, myOrders);

export default router;
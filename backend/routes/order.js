import express from "express"
import { allOrders, getOrderDetails, myOrders, newOrder, updateOrder } from "../controllers/orderController.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/orders/new").post(isAuthenticated, newOrder);
router.route("/orders/:id").get(isAuthenticated, getOrderDetails);
router.route("/me/orders").get(isAuthenticated, myOrders);
router.route("/admin/orders").get(isAuthenticated, authorizeRoles('admin'), allOrders);
router.route("/admin/orders/:id").put(isAuthenticated, authorizeRoles('admin'), updateOrder);

export default router;
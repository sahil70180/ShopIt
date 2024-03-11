import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import { stripeCheckoutSession } from "../controllers/paymentControllers.js";
const router = express.Router();

router.route("/payment/checkout_session").post(isAuthenticated, stripeCheckoutSession);

export default router;
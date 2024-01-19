import express  from "express";
import { getProdcuts } from "../controllers/productController.js";

const router = express.Router();

router.route("/get-products").get(getProdcuts);

export default router;
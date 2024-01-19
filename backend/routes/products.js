import express  from "express";
import { getProdcuts, newProduct } from "../controllers/productController.js";

const router = express.Router();

router.route("/get-products").get(getProdcuts);
router.route("/admin/newProduct").post(newProduct)

export default router;
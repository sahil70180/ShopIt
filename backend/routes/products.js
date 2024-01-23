import express  from "express";
import { getProdcuts, getProductDetails, newProduct } from "../controllers/productController.js";

const router = express.Router();

router.route("/products").get(getProdcuts);
router.route("/admin/newProduct").post(newProduct)
router.route("/products/:id").get(getProductDetails);

export default router;
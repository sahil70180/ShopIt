import express  from "express";
import cookieParser from "cookie-parser";
import { createProductReview, deleteProduct, getProdcuts, getProductDetails, newProduct, updateProduct } from "../controllers/productController.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.use(cookieParser());

router.route("/products").get(getProdcuts);
router.route("/products/:id").get(getProductDetails);

router.route("/admin/newProduct").post(isAuthenticated, authorizeRoles("admin"),  newProduct)
router.route("/admin/products/:id").put( isAuthenticated, authorizeRoles("admin"), updateProduct);
router.route("/admin/products/:id").delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);
router.route("/reviews").put(isAuthenticated, createProductReview);

export default router;
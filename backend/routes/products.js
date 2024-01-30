import express  from "express";
import cookieParser from "cookie-parser";
import { deleteProduct, getProdcuts, getProductDetails, newProduct, updateProduct } from "../controllers/productController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.use(cookieParser());

router.route("/products").get(isAuthenticated ,getProdcuts);
router.route("/admin/newProduct").post(isAuthenticated, newProduct)
router.route("/products/:id").get(getProductDetails);
router.route("/products/:id").put( isAuthenticated, updateProduct);
router.route("/products/:id").delete(isAuthenticated, deleteProduct);

export default router;
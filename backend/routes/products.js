import express  from "express";
import { deleteProduct, getProdcuts, getProductDetails, newProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.route("/products").get(getProdcuts);
router.route("/admin/newProduct").post(newProduct)
router.route("/products/:id").get(getProductDetails);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProduct);

export default router;
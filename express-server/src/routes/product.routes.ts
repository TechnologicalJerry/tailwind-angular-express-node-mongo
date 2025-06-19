import express from "express";
import { createProduct, getAllProducts, updateProduct, deleteProduct } from "../controllers/product.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authenticateJWT, createProduct);
router.get("/", getAllProducts);
router.put("/:id", authenticateJWT, updateProduct);
router.delete("/:id", authenticateJWT, deleteProduct);

export default router;

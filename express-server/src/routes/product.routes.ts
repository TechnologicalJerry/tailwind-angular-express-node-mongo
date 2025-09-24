import { Router } from "express";
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controller/product.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../schema/product.schema";

const router = Router();

// POST /api/products - Create a new product
router.post(
  "/",
  [requireUser, validateResource(createProductSchema)],
  createProductHandler
);

// GET /api/products/:productId - Get a single product
router.get(
  "/:productId",
  validateResource(getProductSchema),
  getProductHandler
);

// PUT /api/products/:productId - Update a product
router.put(
  "/:productId",
  [requireUser, validateResource(updateProductSchema)],
  updateProductHandler
);

// DELETE /api/products/:productId - Delete a product
router.delete(
  "/:productId",
  [requireUser, validateResource(deleteProductSchema)],
  deleteProductHandler
);

export default router;

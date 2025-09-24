import { Router } from "express";
import { createUserHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

const router = Router();

// POST /api/users - Register a new user
router.post("/", validateResource(createUserSchema), createUserHandler);

export default router;

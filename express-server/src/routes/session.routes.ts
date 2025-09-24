import { Router } from "express";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "../controller/session.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/session.schema";

const router = Router();

// POST /api/sessions - Create a new session (login)
router.post("/", validateResource(createSessionSchema), createUserSessionHandler);

// GET /api/sessions - Get all sessions for current user
router.get("/", requireUser, getUserSessionsHandler);

// DELETE /api/sessions - Delete current session (logout)
router.delete("/", requireUser, deleteSessionHandler);

export default router;

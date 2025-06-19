import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", authenticateJWT, updateUser);
router.delete("/delete", authenticateJWT, deleteUser);

export default router;

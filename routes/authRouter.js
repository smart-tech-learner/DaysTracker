import { Router } from "express";
const router = Router();
import { register, login, logout } from "../controllers/authController.js";
import {
  validateLoginUserInput,
  validateRegisterUserInput,
} from "../middleware/validationMiddleware.js";

router.post("/register", validateRegisterUserInput, register);
router.post("/login", validateLoginUserInput, login);
router.get("/logout", logout);

export default router;

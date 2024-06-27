import { Router } from "express";
import {
  getCurrentUser,
  updateUserPassword,
} from "../controllers/userController.js";
import { validateUserPassword } from "../middleware/validationMiddleware.js";
const router = Router();

router.get("/currentUser", getCurrentUser);
router.patch("/updatePassword", validateUserPassword, updateUserPassword);

export default router;

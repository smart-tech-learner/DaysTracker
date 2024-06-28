import { Router } from "express";
import {
  getCurrentUser,
  resetUserPassword,
  updateUserPassword,
} from "../controllers/userController.js";
import {
  validateDetailsOnPasswordReset,
  validateUserPassword,
} from "../middleware/validationMiddleware.js";
const router = Router();

router.get("/currentUser", getCurrentUser);
router.patch("/updatePassword", validateUserPassword, updateUserPassword);
router.patch(
  "/resetPassword",
  validateDetailsOnPasswordReset,
  resetUserPassword
);

export default router;

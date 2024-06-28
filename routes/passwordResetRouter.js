import { Router } from "express";
import { resetUserPassword } from "../controllers/userController.js";
import { validateDetailsOnPasswordReset } from "../middleware/validationMiddleware.js";

const router = Router();

router.patch(
  "/resetPassword",
  validateDetailsOnPasswordReset,
  resetUserPassword
);

export default router;

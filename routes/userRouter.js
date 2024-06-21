import { Router } from "express";
import { getCurrentUser } from "../controllers/userController.js";
const router = Router();

router.get("/currentUser", getCurrentUser);

export default router;

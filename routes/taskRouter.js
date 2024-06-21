import { Router } from "express";
const router = Router();

import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import {
  validateDaysTrackerTaskInput,
  validateIdParams,
} from "../middleware/validationMiddleware.js";

router
  .route("/")
  .get(getAllTasks)
  .post(validateDaysTrackerTaskInput, createTask);
router
  .route("/:id")
  .get(validateIdParams, getTask)
  .patch(validateDaysTrackerTaskInput, validateIdParams, updateTask)
  .delete(validateIdParams, deleteTask);

export default router;

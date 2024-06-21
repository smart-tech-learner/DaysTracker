import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors/customErrors.js";
import {
  GENDERS,
  ROLES,
  TASK_STATUS,
  TRACK_OPTIONS,
} from "../utils/constants.js";
import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import TaskModel from "../models/TaskModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMsgs = errors.array().map((error) => error.msg);
        if (errorMsgs[0].startsWith("no job")) {
          throw new NotFoundError(errorMsgs);
        }

        if (errorMsgs[0].startsWith("not authorized to access the resource")) {
          throw new UnAuthorizedError(errorMsgs);
        }
        throw new BadRequestError(errorMsgs);
      }
      next();
    },
  ];
};

export const validateDaysTrackerTaskInput = withValidationErrors([
  body("taskId").notEmpty().withMessage("task id is required"),
  body("taskName").notEmpty().withMessage("task name is required"),
  body("subTaskId").notEmpty().withMessage("sub task id is required"),
  body("subTaskName").notEmpty().withMessage("sub task name is required"),
  body("title").notEmpty().withMessage("title is required"),
  body("trackOption")
    .isIn(Object.values(TRACK_OPTIONS))
    .withMessage("invalid track option value"),
  body("status")
    .isIn(Object.values(TASK_STATUS))
    .withMessage("invalid status value"),
]);

export const validateIdParams = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError("invalid mongoDB id");

    const task = await TaskModel.findById(value);
    if (!task) throw new NotFoundError(`no job found with id ${value}`);

    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === task.createdBy.toString();

    if (!isAdmin && !isOwner) {
      throw new UnAuthorizedError("not authorized to access the resource");
    }
  }),
]);

export const validateRegisterUserInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("first name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });

      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("gender")
    .isIn(Object.values(GENDERS))
    .withMessage("invalid gender value"),
  body("dob").notEmpty().withMessage("date of birth is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 5 })
    .withMessage("password must be minimum 5 chars long"),
]);

export const validateLoginUserInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

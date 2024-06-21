import { nanoid } from "nanoid";
import DaysTrackerTaskModel from "../models/TaskModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

let daysTrackerTasksList = [
  {
    id: nanoid(),
    taskId: 5,
    taskName: "Other",
    subTaskId: 44,
    subTaskName: "Other",
    title: "Elica Chimney Service",
    trackOption: "time_passed",
    startDate: "2023-11-28",
    endDate: "",
    status: "",
    icon: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3b0.png",
  },
  {
    id: nanoid(),
    taskId: 5,
    taskName: "Other",
    subTaskId: 44,
    subTaskName: "Other",
    title: "Aquaguard Filter change",
    trackOption: "time_passed",
    startDate: "2024-02-09",
    endDate: "",
    status: "",
    icon: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f6b0.png",
  },
  {
    id: nanoid(),
    taskId: 5,
    taskName: "Other",
    subTaskId: 44,
    subTaskName: "Other",
    title: "Family photo school activity",
    trackOption: "time_left",
    startDate: "2024-06-10",
    endDate: "2024-06-22",
    status: "in-progress",
    icon: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f5bc-fe0f.png",
  },
];

//GET ALL DAYS TRACKER TASKS
export const getAllTasks = async (request, response) => {
  const tasks = await DaysTrackerTaskModel.find({
    createdBy: request.user.userId,
  });
  response.status(StatusCodes.OK).json({ tasks });
};

// GET SINGLE TASK
export const getTask = async (request, response) => {
  const { id } = request.params;

  const daysTrackerTask = await DaysTrackerTaskModel.findById(id);

  if (!daysTrackerTask) {
    throw new NotFoundError(`No task with id ${id}`);
  }

  return response.status(StatusCodes.OK).json({ details: daysTrackerTask });
};

//CREATE DAYS TRACKER TASK
export const createTask = async (request, response) => {
  request.body.createdBy = request.user.userId;
  const newDaysTrackerTask = await DaysTrackerTaskModel.create(request.body);
  return response.status(StatusCodes.CREATED).json({ newDaysTrackerTask });
};

// EDIT DAYS TRACKER TASK
export const updateTask = async (request, response) => {
  const { id } = request.params;

  const updatedTask = await DaysTrackerTaskModel.findByIdAndUpdate(
    id,
    request.body,
    {
      new: true,
    }
  );

  if (!updatedTask) {
    throw new NotFoundError(`No task with id ${id}`);
  }

  return response
    .status(StatusCodes.OK)
    .json({ msg: "task updated", details: updatedTask });
};

//DELETE DAYS TRACKER TASK
export const deleteTask = async (request, response) => {
  const { id } = request.params;

  const removedTask = await DaysTrackerTaskModel.findByIdAndDelete(id);

  if (!removedTask) {
    throw new NotFoundError(`No task with id ${id}`);
  }

  return response
    .status(StatusCodes.OK)
    .json({ msg: `Task ${id} deleted successfully` });
};

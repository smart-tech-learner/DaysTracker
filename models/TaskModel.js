import mongoose from "mongoose";
import { TRACK_OPTIONS, TASK_STATUS } from "../utils/constants.js";

const DaysTrackerTaskSchema = new mongoose.Schema(
  {
    taskId: Number,
    taskName: String,
    subTaskId: Number,
    subTaskName: String,
    title: String,
    trackOption: {
      type: String,
      enum: Object.values(TRACK_OPTIONS),
    },
    icon: String,
    startDate: Date,
    endDate: Date,
    timePeriod: String,
    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.IN_PROGRESS,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DaysTrackerTask", DaysTrackerTaskSchema);

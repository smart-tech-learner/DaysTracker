import React, { useState } from "react";
import "../css/DaysTrackerCreationPage.css";
import calendar_icon from "/icons/calendar_icon.png";
import logo from "/icons/logo.png";
import { toast } from "react-toastify";
import EmojiPicker from "emoji-picker-react";
import hourglass_icon from "/icons/hourglass_icon.png";
import {
  computeYearsMonthsDaysForTimeLeft,
  computeYearsMonthsDaysForTimePassed,
  convertDate,
  currentDate,
  isSelDateGtThanCurrDate,
  isSelDateLsThanCurrDate,
} from "../Utils/Utilities";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import FormLabel from "./FormLabel";
import FormInput from "./FormInput";
import TasksList from "../Constants/TasksList";
import SubTasksList from "../Constants/SubTasksList";
import axios from "axios";

export const loader = async ({ params }) => {
  try {
    const taskId = await params.id;
    const { data } = await axios.get(`/api/v1/daysTracker/tasks/${taskId}`);

    if (data.details.startDate) {
      const readableStartDate = convertDate(data.details.startDate);
      data.details.startDate = readableStartDate;
    }

    if (data.details.endDate) {
      const readableEndDate = convertDate(data.details.endDate);
      data.details.endDate = readableEndDate;
    }

    return data.details;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/tasks");
  }
};

const TaskDetails = () => {
  const {
    _id,
    taskId,
    taskName,
    subTaskId,
    subTaskName,
    icon,
    title,
    startDate,
    endDate,
    status,
    trackOption,
  } = useLoaderData();

  const prepareSubTasksList = () => {
    const filSubTaskList = SubTasksList().filter(
      (task) => task.taskId === parseInt(taskDetails.taskId)
    );
    return filSubTaskList;
  };

  const navigate = useNavigate();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [taskDetails, setTaskDetails] = useState({
    taskId: taskId,
    task: taskName,
    subTaskId: subTaskId,
    subTask: subTaskName,
    icon: icon,
    title: title,
    trackOption: trackOption,
    startDate: startDate,
    endDate: endDate,
    status: status,
    timePeriod:
      trackOption === "time_passed"
        ? computeYearsMonthsDaysForTimePassed(startDate)
        : computeYearsMonthsDaysForTimeLeft(endDate),
  });
  const [filteredSubTaskList, setFilteredSubTaskList] =
    useState(prepareSubTasksList);
  const [dateLabel, setDateLabel] = useState(
    taskDetails.trackOption === "time_left"
      ? taskDetails.status === "completed"
        ? "Completed On"
        : "Complete By"
      : "Started On"
  );
  const [disableDateField, setDisableDateField] = useState(
    !taskDetails.startDate
  );

  const [dateValue, setDateValue] = useState(
    taskDetails.trackOption === "time_passed"
      ? taskDetails.startDate
      : taskDetails.endDate
  );

  const onClickDeleteTask = async () => {
    let confirmationText = `Are you sure you want to delete the task? `;
    if (confirm(confirmationText) == true) {
      try {
        await axios.delete(`/api/v1/daysTracker/tasks/${_id}`);
        toast.info("Task deleted successfully!");
        navigate("/tasks");
      } catch (error) {
        toast.error(error?.ressponse?.data?.msg);
        return error;
      }
    }
  };

  const markTaskCompleted = async (event) => {
    let confirmationText = `Are you sure you want to mark the task as completed? `;
    if (confirm(confirmationText) == true) {
      var todayDate = new Date().toISOString().slice(0, 10);

      const updatedTask = {
        taskId: taskDetails.taskId,
        taskName: taskDetails.task,
        subTaskId: taskDetails.subTaskId,
        subTaskName: taskDetails.subTask,
        title: taskDetails.title,
        trackOption: taskDetails.trackOption,
        startDate: taskDetails.startDate,
        endDate: todayDate,
        status: "completed",
        icon: taskDetails.icon,
      };

      try {
        await axios.patch(`/api/v1/daysTracker/tasks/${_id}`, updatedTask);
        toast.success("Task completed successfully!");
        navigate("/tasks");
      } catch (error) {
        toast.error(error?.ressponse?.data?.msg);
        return error;
      }
    }
  };

  const stopTaskTracking = async (event) => {
    let confirmationText = `Are you sure you want to stop tracking this task? `;
    if (confirm(confirmationText) == true) {
      var todayDate = currentDate();

      const updatedTask = {
        taskId: taskDetails.taskId,
        taskName: taskDetails.task,
        subTaskId: taskDetails.subTaskId,
        subTaskName: taskDetails.subTask,
        title: taskDetails.title,
        trackOption: taskDetails.trackOption,
        startDate: taskDetails.startDate,
        endDate: todayDate,
        status: "stopped",
        icon: taskDetails.icon,
        timePeriod: taskDetails.timePeriod,
      };

      try {
        await axios.patch(`/api/v1/daysTracker/tasks/${_id}`, updatedTask);
        toast.success("Task tracking stopped successfully!");
        navigate("/tasks");
      } catch (error) {
        toast.error(error?.ressponse?.data?.msg);
        return error;
      }
    }
  };

  const onSelectIcon = (emojiObject) => {
    setTaskDetails({ ...taskDetails, icon: emojiObject.imageUrl });
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onClickSelectIcons = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onChangeDate = (event) => {
    if (taskDetails.trackOption === "time_passed") {
      const selDateGtThanCurrDate = isSelDateGtThanCurrDate(event.target.value);

      if (selDateGtThanCurrDate) {
        alert("Start date cannot be in the future!");
        setTaskDetails({
          ...taskDetails,
          startDate: "",
          timePeriod: "",
        });
        setDateValue("");
        return;
      }

      const timePeriod = computeYearsMonthsDaysForTimePassed(
        event.target.value
      );
      setDateValue(event.target.value);
      setTaskDetails({
        ...taskDetails,
        startDate: event.target.value,
        timePeriod: timePeriod,
      });
    }

    if (taskDetails.trackOption === "time_left") {
      const selDateLsThanCurrDate = isSelDateLsThanCurrDate(event.target.value);

      if (selDateLsThanCurrDate) {
        alert("Completion date cannot be in the past!");
        setTaskDetails({
          ...taskDetails,
          endDate: "",
          timePeriod: "",
        });
        setDateValue("");
        return;
      }

      const timePeriod = computeYearsMonthsDaysForTimeLeft(event.target.value);
      setDateValue(event.target.value);
      setTaskDetails({
        ...taskDetails,
        endDate: event.target.value,
        timePeriod: timePeriod,
      });
    }
  };

  const onChangeTaskFormDetails = (event) => {
    const { name, value } = event.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const validateForm = () => {
    var errors = {};

    if (!taskDetails.title || taskDetails.title.length === 0) {
      errors.title = "Title cannot be empty!";
    }

    if (!taskDetails.subTaskId) {
      errors.subTask = "Sub Task selection is required!";
    }

    if (
      !taskDetails.trackOption ||
      taskDetails.trackOption === "no_selection"
    ) {
      errors.trackOption = "Please select a tracking option!";
    }

    if (!taskDetails.startDate || taskDetails.startDate.length === 0) {
      errors.startDate = "Please select the date!";
    }

    setFormErrors(errors);
    return errors;
  };

  const onChangeTask = (event) => {
    const selectedTaskId = event.target.value;

    if (selectedTaskId) {
      const selTaskIndex = TasksList().findIndex(
        (task) => task.id === parseInt(selectedTaskId)
      );

      const selectedTaskName = Object.values(TasksList())[selTaskIndex].name;
      setTaskDetails({
        ...taskDetails,
        taskId: selectedTaskId,
        task: selectedTaskName,
        subTaskId: "",
        subTaskName: "",
        title: selectedTaskName,
      });

      const filSubTaskList = SubTasksList().filter(
        (task) => task.taskId === parseInt(selectedTaskId)
      );

      setFilteredSubTaskList(filSubTaskList);
    }
  };

  const onChangeSubTask = (event) => {
    const selectedSubTaskId = event.target.value;
    if (selectedSubTaskId) {
      const selSubTaskIndex = SubTasksList().findIndex(
        (task) => task.id === parseInt(selectedSubTaskId)
      );

      const selectedSubTaskName = Object.values(SubTasksList())[selSubTaskIndex]
        .name;
      setTaskDetails({
        ...taskDetails,
        subTaskId: selectedSubTaskId,
        subTask: selectedSubTaskName,
        title: taskDetails.task + " - " + selectedSubTaskName,
      });
    }
  };

  const updateTaskDetails = async (event) => {
    event.preventDefault();
    const errors = validateForm();

    if (errors && Object.keys(errors).length === 0) {
      const updatedTask = {
        taskId: taskDetails.taskId,
        taskName: taskDetails.task,
        subTaskId: taskDetails.subTaskId,
        subTaskName: taskDetails.subTask,
        title: taskDetails.title,
        trackOption: taskDetails.trackOption,
        startDate: taskDetails.startDate,
        endDate: taskDetails.endDate,
        status: taskDetails.status,
        icon: taskDetails.icon,
      };

      try {
        await axios.patch(`/api/v1/daysTracker/tasks/${_id}`, updatedTask);
        toast.success("Task updated successfully!");
        navigate("/tasks");
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    }
  };

  const onChangeTrackingOption = (event) => {
    const selectedTrackDetail = event.target.value;
    if (selectedTrackDetail !== "no_selection") {
      setDisableDateField(false);
    } else {
      setDisableDateField(true);
    }

    if (selectedTrackDetail === "time_passed") {
      setDateLabel("Started On");
    } else {
      if (selectedTrackDetail === "time_left") {
        if (taskDetails.status === "completed") {
          setDateLabel("Completed On");
        } else {
          setDateLabel("Complete By");
        }
      } else {
        setDateLabel("Since");
      }
    }

    setTaskDetails({
      ...taskDetails,
      startDate: "",
      timePeriod: "",
      trackOption: selectedTrackDetail,
    });
    setDateValue("");
  };

  return (
    <div
      div
      className="container"
      style={{ paddingTop: "80px", paddingBottom: "100px" }}
    >
      <NavBar />
      <div style={{ padding: "0 0 50px 0" }}>
        <h4 style={{ float: "left", paddingTop: "5px" }}>Task Details</h4>
        <div style={{ float: "right" }}>
          <Link to="/tasks" className="btn btn-secondary">
            Back
          </Link>
          &nbsp;
          {taskDetails.status !== "in-progress" && (
            <Link
              to="/tasks"
              className="btn btn-danger"
              onClick={onClickDeleteTask}
            >
              Delete
            </Link>
          )}
          {taskDetails.status === "in-progress" && (
            <div className="btn-group dropstart">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                Actions
              </button>
              <ul className="dropdown-menu dropdown-menu-lg-end">
                <li>
                  <button
                    type="submit"
                    className="dropdown-item"
                    onClick={updateTaskDetails}
                  >
                    Save
                  </button>
                </li>
                {taskDetails.trackOption === "time_left" && (
                  <li>
                    <button
                      rendered="false"
                      type="submit"
                      className="dropdown-item"
                      onClick={markTaskCompleted}
                    >
                      Mark Complete
                    </button>
                  </li>
                )}
                {taskDetails.trackOption === "time_passed" && (
                  <li>
                    <button
                      rendered="false"
                      type="submit"
                      className="dropdown-item"
                      onClick={stopTaskTracking}
                    >
                      Stop Tracking
                    </button>
                  </li>
                )}
                <li>
                  <button
                    type="submit"
                    className="dropdown-item"
                    onClick={onClickDeleteTask}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <br></br>
      <div className="grid-container1">
        <div className="item21">
          {taskDetails.icon ? (
            <h3>
              <img src={taskDetails.icon} height="30" />
            </h3>
          ) : (
            <h3>
              <img src={logo} height="40" />
            </h3>
          )}
        </div>
        <div className="item31">
          <h5 className="card-title">{taskDetails.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {taskDetails.timePeriod}
          </h6>
        </div>
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <div className="input-group mb-3">
        <span className="input-group-text" onClick={onClickSelectIcons}>
          {taskDetails.icon ? (
            <h3>
              <img src={taskDetails.icon} height="30" />
            </h3>
          ) : (
            <h3>
              <img src={logo} height="30" />
            </h3>
          )}
        </span>
        {showEmojiPicker && (
          <EmojiPicker theme="dark" onEmojiClick={onSelectIcon} required />
        )}
        &nbsp;
        <input
          type="text"
          name="title"
          className="form-control"
          value={taskDetails.title}
          onChange={onChangeTaskFormDetails}
          disabled={
            taskDetails.status === "completed" ||
            taskDetails.status === "stopped"
          }
        />
      </div>
      {formErrors.title && (
        <div style={{ color: "red", margin: "-15px 0px 10px 0px" }}>
          {formErrors.title}
        </div>
      )}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div data-mdb-input-init className="form-outline">
            <FormLabel name="task" labelText="Task" />
            <select
              className="form-select"
              required
              id="task"
              name="task"
              onChange={onChangeTask}
              value={taskDetails.taskId}
              disabled={
                taskDetails.status === "completed" ||
                taskDetails.status === "stopped"
              }
            >
              <option>--select task --</option>
              {TasksList().map((itemValue) => {
                return (
                  <option key={itemValue.id} value={itemValue.id}>
                    {itemValue.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div data-mdb-input-init className="form-outline">
            <FormLabel name="subTask" labelText="Sub Task" />
            <select
              className="form-select"
              required
              id="subTask"
              name="subTask"
              onChange={onChangeSubTask}
              value={taskDetails.subTaskId}
              disabled={
                taskDetails.status === "completed" ||
                taskDetails.status === "stopped"
              }
            >
              <option value="">--select subtask --</option>
              {filteredSubTaskList &&
                filteredSubTaskList.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            {formErrors.subTask && (
              <div style={{ color: "red" }}>{formErrors.subTask}</div>
            )}
          </div>
        </div>
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <img src={hourglass_icon} height={25} />
          </span>
        </div>

        <select
          className="form-select"
          required
          id="trackOption"
          name="trackOption"
          value={taskDetails.trackOption}
          onChange={onChangeTrackingOption}
          disabled={
            taskDetails.status === "completed" ||
            taskDetails.status === "stopped"
          }
        >
          <option value="no_selection">-- select tracking option --</option>
          <option value="time_passed">
            Time Passed (Time since for something you wanted to track the
            period/progress from a specific date)
          </option>
          <option value="time_left">
            Time Left (Typically a reminder on the time left to complete
            something)
          </option>
        </select>
      </div>
      {formErrors.trackOption && (
        <div style={{ color: "red", margin: "-15px 0px 10px 0px" }}>
          {formErrors.trackOption}
        </div>
      )}
      <div></div>
      <FormLabel name="startDate" labelText={dateLabel} />
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <img src={calendar_icon} height={25} />
          </span>
        </div>
        <input
          type="date"
          name="startDate"
          disabled={
            disableDateField ||
            taskDetails.status === "completed" ||
            taskDetails.status === "stopped"
          }
          value={dateValue}
          className="form-control"
          onChange={onChangeDate}
        />
      </div>
      {formErrors.startDate && (
        <div style={{ color: "red", margin: "-15px 0px 10px 0px" }}>
          {formErrors.startDate}
        </div>
      )}
    </div>
  );
};

export default TaskDetails;

import React, { useState } from "react";
import "../css/DaysTrackerCreationPage.css";
import calendar_icon from "/icons/calendar_icon.png";
import hourglass_icon from "/icons/hourglass_icon.png";

import logo from "/icons/logo.png";
import { toast } from "react-toastify";
import EmojiPicker from "emoji-picker-react";
import {
  computeYearsMonthsDaysForTimeLeft,
  computeYearsMonthsDaysForTimePassed,
  currentDate,
  isSelDateGtThanCurrDate,
  isSelDateLsThanCurrDate,
} from "../Utils/Utilities";
import { Link, useNavigate } from "react-router-dom";
import { addedItemsList } from "../Pages/Tasks";
import NavBar from "./NavBar";
import FormInput from "./FormInput";
import FormLabel from "./FormLabel";
import axios from "axios";

const AddTask = (props) => {
  const navigate = useNavigate();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [newTaskDetails, setNewTaskDetails] = useState({
    title: props.selectedTask.name + " - " + props.selectedSubTask.name,
    trackOption: "",
    startDate: "",
    endDate: "",
    timePeriod: "",
    icon: props.selectedSubTask.icon,
  });
  const [dateLabel, setDateLabel] = useState("Since");
  const [disableDateField, setDisableDateField] = useState(true);
  const [dateValue, setDateValue] = useState();

  const onSelectIcon = (emojiObject) => {
    setNewTaskDetails({ ...newTaskDetails, icon: emojiObject.imageUrl });
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onClickSelectIcons = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onChangeDate = (event) => {
    if (newTaskDetails.trackOption === "time_passed") {
      const selDateGtThanCurrDate = isSelDateGtThanCurrDate(event.target.value);

      if (selDateGtThanCurrDate) {
        alert("Start date cannot be in the future!");
        setNewTaskDetails({
          ...newTaskDetails,
          startDate: "",
          timePeriod: "",
        });
        setDateValue("");
        return;
      }

      const timePeriod = computeYearsMonthsDaysForTimePassed(
        event.target.value
      );
      setNewTaskDetails({
        ...newTaskDetails,
        startDate: event.target.value,
        timePeriod: timePeriod,
      });
      setDateValue(event.target.value);
    }

    if (newTaskDetails.trackOption === "time_left") {
      const selDateLsThanCurrDate = isSelDateLsThanCurrDate(event.target.value);

      if (selDateLsThanCurrDate) {
        alert("Completion date cannot be in the past!");
        setNewTaskDetails({
          ...newTaskDetails,
          endDate: "",
          timePeriod: "",
        });
        setDateValue("");
        return;
      }

      const timePeriod = computeYearsMonthsDaysForTimeLeft(event.target.value);
      setNewTaskDetails({
        ...newTaskDetails,
        endDate: event.target.value,
        timePeriod: timePeriod,
      });
      setDateValue(event.target.value);
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
        setDateLabel("Complete By");
      } else {
        setDateLabel("Since");
      }
    }

    setNewTaskDetails({
      ...newTaskDetails,
      startDate: "",
      timePeriod: "",
      trackOption: selectedTrackDetail,
    });
  };

  const onChangeCreateFormDetails = (event) => {
    const { name, value } = event.target;
    setNewTaskDetails({ ...newTaskDetails, [name]: value });
  };

  const validateForm = () => {
    var errors = {};

    if (!newTaskDetails.title || newTaskDetails.title.length === 0) {
      errors.title = "Title cannot be empty!";
    }

    if (
      !newTaskDetails.trackOption ||
      newTaskDetails.trackOption === "no_selection"
    ) {
      errors.trackOption = "Please select a tracking option!";
    }

    if (newTaskDetails.trackOption === "time_passed") {
      if (!newTaskDetails.startDate || newTaskDetails.startDate.length === 0) {
        errors.date = "Please select the date!";
      }
    } else if (newTaskDetails.trackOption === "time_left") {
      if (!newTaskDetails.endDate || newTaskDetails.endDate.length === 0) {
        errors.date = "Please select the date!";
      }
    }

    setFormErrors(errors);
    return errors;
  };

  const createNewTask = async (event) => {
    event.preventDefault();
    const errors = validateForm();

    if (errors && Object.keys(errors).length === 0) {
      const newTask = {
        taskId: props.selectedTask.id,
        taskName: props.selectedTask.name,
        subTaskId: props.selectedSubTask.id,
        subTaskName: props.selectedSubTask.name,
        title: newTaskDetails.title,
        trackOption: newTaskDetails.trackOption,
        startDate:
          newTaskDetails.trackOption === "time_left"
            ? currentDate()
            : newTaskDetails.startDate,
        endDate:
          newTaskDetails.trackOption === "time_left"
            ? newTaskDetails.endDate
            : "",
        status: "in-progress",
        icon: newTaskDetails.icon,
      };

      try {
        await axios.post("/api/v1/daysTracker/tasks", newTask);
        toast.success("Task created successfully!");
        navigate("/tasks");
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    }
  };

  return (
    <section className="vh-50" style={{ backgroundColor: "9A616D" }}>
      <div className="container py-1 h-100">
        <div className="row d-flex justify-content-center align-items-center h-80">
          <div className="col col-xl-8">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div
                div
                className="container"
                style={{ paddingTop: "30px", paddingBottom: "30px" }}
              >
                <NavBar />
                <div style={{ padding: "0 0 50px 0" }}>
                  <h4 style={{ float: "left", paddingTop: "5px" }}>New Task</h4>
                  <div style={{ float: "right" }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={createNewTask}
                    >
                      Create
                    </button>
                    &nbsp;
                    <Link to="/tasks" className="btn btn-danger">
                      Cancel
                    </Link>
                  </div>
                </div>
                <br></br>
                <div className="grid-container1">
                  <div className="item21">
                    {newTaskDetails.icon ? (
                      <h3>
                        <img src={newTaskDetails.icon} height="30" />
                      </h3>
                    ) : (
                      <h3>
                        <img src={logo} height="40" />
                      </h3>
                    )}
                  </div>
                  <div className="item31">
                    <h5 className="card-title">{newTaskDetails.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      {newTaskDetails.timePeriod}
                    </h6>
                  </div>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="input-group mb-3">
                  <span
                    className="input-group-text"
                    onClick={onClickSelectIcons}
                  >
                    {newTaskDetails.icon ? (
                      <h3>
                        <img src={newTaskDetails.icon} height="30" />
                      </h3>
                    ) : (
                      <h3>
                        <img src={logo} height="30" />
                      </h3>
                    )}
                  </span>
                  {showEmojiPicker && (
                    <EmojiPicker
                      theme="dark"
                      onEmojiClick={onSelectIcon}
                      required
                    />
                  )}
                  &nbsp;
                  <FormInput
                    type="text"
                    name="title"
                    value={newTaskDetails.title}
                    onChange={onChangeCreateFormDetails}
                  />
                </div>
                {formErrors.title && (
                  <div style={{ color: "red", margin: "-15px 0px 10px 0px" }}>
                    {formErrors.title}
                  </div>
                )}
                <FormLabel
                  name="trackOption"
                  labelText="How do you want to track?"
                />
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
                    value={newTaskDetails.trackOption}
                    onChange={onChangeTrackingOption}
                  >
                    <option value="no_selection">
                      -- select tracking option --
                    </option>
                    <option value="time_passed">
                      Time Passed (Time since for something you wanted to track
                      the period/progress from a specific date)
                    </option>
                    <option value="time_left">
                      Time Left (Typically a reminder on the time left to
                      complete something)
                    </option>
                  </select>
                </div>
                {formErrors.trackOption && (
                  <div style={{ color: "red", margin: "-15px 0px 10px 0px" }}>
                    {formErrors.trackOption}
                  </div>
                )}
                <div>
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
                      className="form-control"
                      disabled={disableDateField}
                      value={dateValue}
                      onChange={onChangeDate}
                    />
                  </div>
                  {formErrors.date && (
                    <div style={{ color: "red", margin: "-15px 0px 10px 0px" }}>
                      {formErrors.date}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddTask;

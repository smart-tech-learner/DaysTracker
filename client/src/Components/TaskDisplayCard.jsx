import React from "react";
import "../css/TaskDisplayCard.css";
import logo from "/icons/logo.png";
import completed_icon from "/icons/completed_icon.png";
import stopped_icon from "/icons/stopped_icon.png";
import delete_icon from "/icons/delete_icon.png";

import {
  computeYearsMonthsDaysForTimeLeft,
  computeYearsMonthsDaysForTimePassed,
} from "../Utils/Utilities";
import { useNavigate } from "react-router-dom";
import day from "dayjs";
import { toast } from "react-toastify";
import { addedItemsList } from "../Pages/Dashboard";

const TaskDisplayCard = (props) => {
  const navigate = useNavigate();

  const onClickDeleteTask = (taskId) => {
    let confirmationText = `Are you sure you want to delete the task?`;
    if (confirm(confirmationText) == true) {
      const taskIndex = addedItemsList.findIndex((item) => item.id === taskId);

      addedItemsList.splice(taskIndex, 1);
      toast.info("Task deleted successfully!");
      navigate("/dashboard");
    }
  };

  const {
    _id,
    taskName,
    subTaskName,
    title,
    trackOption,
    startDate,
    endDate,
    status,
    icon,
    timePeriod,
  } = props.itemDetails;
  const startDateAttr = day(startDate).format("MMM DD, YYYY");
  const endDateAttr = day(endDate).format("MMM DD, YYYY");

  const onClickTask = () => {
    navigate(`taskDetails/${_id}`);
  };

  return (
    <div
      className="container"
      onClick={props.viewAs === "dashboard" ? onClickTask : ""}
    >
      <div
        className="grid-container"
        style={
          props.viewAs === "dashboard"
            ? trackOption === "time_passed"
              ? {
                  backgroundColor: "rgb(186 212 235)",
                  boxShadow: "10px 10px 20px #babecc, -10px -10px 20px #ffffff",
                }
              : {
                  backgroundColor: "#e4d7b2",
                  boxShadow: "10px 10px 20px #babecc, -10px -10px 20px #ffffff",
                }
            : status === "completed"
            ? {
                backgroundColor: "rgb(219 229 223)",
                boxShadow: "10px 10px 20px #babecc, -10px -10px 20px #ffffff",
              }
            : {
                backgroundColor: "rgb(238 200 200)",
                boxShadow: "10px 10px 20px #babecc, -10px -10px 20px #ffffff",
              }
        }
      >
        <div className="item2">
          <img src={icon ? icon : logo} height={40} />
        </div>
        <div className="item3">
          {title !== "" ? (
            <h6 className="card-title">{title}</h6>
          ) : (
            <h6 className="card-title">
              {taskName} {subTaskName}
            </h6>
          )}
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {status === "in-progress" || status === ""
              ? trackOption === "time_passed"
                ? `Started on ${startDateAttr}.`
                : `To be completed on ${endDateAttr}`
              : status === "completed" || status === "completed"
              ? `Created on: ${startDateAttr}. Target date: ${endDateAttr}`
              : `Tracked for ${timePeriod} since ${startDateAttr}.`}
          </h6>

          <div style={{ display: "flex" }}>
            {status === "in-progress" || status === "" ? (
              ""
            ) : status === "completed" ? (
              <img
                src={completed_icon}
                alt=""
                height="35"
                style={{ marginTop: "-7px" }}
              />
            ) : (
              <img
                src={stopped_icon}
                alt=""
                height="30"
                style={{ marginTop: "-5px", marginRight: "5px" }}
              />
            )}
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {status === "in-progress" || status === ""
                ? trackOption === "time_passed"
                  ? `${computeYearsMonthsDaysForTimePassed(
                      startDate
                    )} since started`
                  : `${computeYearsMonthsDaysForTimeLeft(
                      endDate
                    )} left for completion`
                : status === "completed"
                ? `Completed on ${endDateAttr}`
                : `Stopped on ${endDateAttr}.`}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDisplayCard;

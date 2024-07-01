import React from "react";
import "../css/TaskDisplayCard.css";
import logo from "/icons/logo.png";
import completed_icon from "/icons/completed_icon.png";
import stopped_icon from "/icons/stopped_icon.png";

import {
  computeYearsMonthsDaysForTimeLeft,
  computeYearsMonthsDaysForTimePassed,
  isSelDateGtThanCurrDate,
} from "../Utils/Utilities";
import { useNavigate } from "react-router-dom";
import day from "dayjs";

const TaskDisplayCard = (props) => {
  const navigate = useNavigate();

  const {
    _id,
    taskName,
    subTaskName,
    title,
    trackOption,
    startDate,
    endDate,
    completedDate,
    status,
    icon,
    timePeriod,
  } = props.itemDetails;
  const startDateAttr = day(startDate).format("MMM DD, YYYY");
  const endDateAttr = day(endDate).format("MMM DD, YYYY");
  const completionDateAttr = day(completedDate).format("MMM DD, YYYY");

  const onClickTask = () => {
    navigate(`taskDetails/${_id}`);
  };

  return (
    <div className="container" onClick={onClickTask}>
      <div
        className="grid-container"
        style={
          status === "stopped"
            ? {
                backgroundColor: "rgb(235 197 186)",
                // boxShadow: "10px 10px 20px #babecc, -10px -10px 20px #ffffff",
              }
            : status === "completed"
            ? {
                backgroundColor: "rgb(178 228 180)",
                // boxShadow: "10px 10px 20px #babecc, -10px -10px 20px #ffffff",
              }
            : trackOption === "time_passed"
            ? {
                backgroundColor: "rgb(186 212 235)",
                // boxShadow: "10px 10px 20px #babecc, -10px -10px 20px #ffffff",
              }
            : {
                backgroundColor: "#e4d7b2",
                // boxShadow: "10px 10px 20px #babecc, -10px -10px 20px #ffffff",
              }
        }
      >
        <div className="item2">
          <img src={icon ? icon : logo} height={40} />
        </div>
        <div className="item3" style={{ color: "brown" }}>
          {title !== "" ? (
            <h6 className="card-title">{title}</h6>
          ) : (
            <h6 className="card-title">
              {taskName} {subTaskName}
            </h6>
          )}
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {status === "in-progress"
              ? trackOption === "time_passed"
                ? `Started on ${startDateAttr}.`
                : `To be completed on ${endDateAttr}`
              : status === "completed" || status === "completed"
              ? `Created on: ${startDateAttr}. Due date: ${endDateAttr}`
              : `Tracked for ${timePeriod} since ${startDateAttr}.`}
          </h6>

          <div style={{ display: "flex" }}>
            {status === "in-progress" ? (
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
              {status === "in-progress"
                ? trackOption === "time_passed"
                  ? `${computeYearsMonthsDaysForTimePassed(
                      startDate
                    )} since started`
                  : isSelDateGtThanCurrDate(endDate)
                  ? `${computeYearsMonthsDaysForTimeLeft(
                      endDate
                    )} left for completion`
                  : `Overdue for ${computeYearsMonthsDaysForTimePassed(
                      endDate
                    )} since ${endDateAttr} till today.`
                : status === "completed"
                ? completedDate > endDate
                  ? `Completed on ${completionDateAttr} (overdued for ${parseInt(
                      (new Date(completedDate) - new Date(endDate)) /
                        (1000 * 60 * 60 * 24),
                      10
                    )} days).`
                  : `Completed on ${completionDateAttr} (${parseInt(
                      (new Date(endDate) - new Date(completedDate)) /
                        (1000 * 60 * 60 * 24),
                      10
                    )} days prior to completion date.)`
                : `Stopped on ${endDateAttr}.`}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDisplayCard;

import React, { useState } from "react";
import task_in_progress from "/icons/task_in_progress.png";
import task_total from "/icons/task_total.png";
import task_stopped from "/icons/task_stopped.png";
import task_completed from "/icons/task_completed.png";
import "../css/SectionContainer.css";
import { useAllTasksContext } from "../Pages/Tasks";

const SectionContainer = (props) => {
  const data = useAllTasksContext();

  const getInProgressTasksCount = () => {
    const inProgressTasks = data.allTasks.tasks.filter(
      (task) => task.status === "in-progress"
    );
    return inProgressTasks.length;
  };

  const getInCompletedTasksCount = () => {
    const completedTasks = data.allTasks.tasks.filter(
      (task) => task.status === "completed"
    );
    return completedTasks.length;
  };

  const getStoppedTasksCount = () => {
    const completedTasks = data.allTasks.tasks.filter(
      (task) => task.status === "stopped"
    );
    return completedTasks.length;
  };

  const onSelectedStatusForFilter = (status) => {
    props.selectedStatusToFilter(status);
  };
  return (
    <div className="container box-container">
      <div
        className="box_elements"
        onClick={() => onSelectedStatusForFilter("in-progress")}
      >
        <img src={task_in_progress} alt="in-progress" height="20" />
        <h5 className="count">{getInProgressTasksCount()}</h5>
        <h6 className="status">In progess</h6>
      </div>
      &nbsp;&nbsp;
      <div
        className="box_elements"
        onClick={() => onSelectedStatusForFilter("completed")}
      >
        <img src={task_completed} alt="completed" height="20" />
        <h5 className="count">{getInCompletedTasksCount()}</h5>
        <h6 className="status">Completed</h6>
      </div>
      &nbsp;&nbsp;
      <div
        className="box_elements"
        onClick={() => onSelectedStatusForFilter("stopped")}
      >
        <img src={task_stopped} alt="stopped" height="20" />
        <h5 className="count">{getStoppedTasksCount()}</h5>
        <h6 className="status">Stopped</h6>
      </div>
      &nbsp;&nbsp;
      <div
        className="box_elements"
        onClick={() => onSelectedStatusForFilter("total")}
      >
        <img src={task_total} alt="total" height="20" />
        <h5 className="count">{data.allTasks.tasks.length}</h5>
        <h6 className="status">Total Tasks</h6>
      </div>
    </div>
  );
};

export default SectionContainer;

import React from "react";
import no_tasks_image from "/images/no_tasks.svg";
import TaskDisplayCard from "./TaskDisplayCard";

const TasksDisplayContainer = (props) => {
  return (
    <div>
      {props.filteredTaskByStatus.length == 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "350px",
          }}
        >
          <img src={no_tasks_image} alt="no_task" />
        </div>
      ) : (
        <div>
          {props.filteredTaskByStatus &&
            props.filteredTaskByStatus.map((item) => {
              return <TaskDisplayCard itemDetails={item} key={item._id} />;
            })}
        </div>
      )}
    </div>
  );
};

export default TasksDisplayContainer;

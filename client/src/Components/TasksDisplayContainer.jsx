import React from "react";
import no_tasks_image from "/images/no_tasks.jpg";
import TaskDisplayCard from "./TaskDisplayCard";

const TasksDisplayContainer = (props) => {
  const filteredTasks = props.filteredTaskByStatus;
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
          {/* {displaySearch && <Search closeSearch={closeSearch} />} */}
          {props.filteredTaskByStatus &&
            props.filteredTaskByStatus.map((item) => {
              return (
                <TaskDisplayCard
                  itemDetails={item}
                  key={item._id}
                  viewAs="dashboard"
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default TasksDisplayContainer;

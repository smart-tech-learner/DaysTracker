import React from "react";
import right_arrow_icon from "/icons/right_arrow_icon.png";
import TasksList from "../Constants/TasksList";

const TasksListComponent = (props) => {
  const tasksList = TasksList();

  const onSelectTask = (task) => {
    props.selectedTask(task);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "50px",
      }}
    >
      <div className="card" style={{ width: "500px" }}>
        <ul className="list-group list-group-flush">
          {tasksList.map((task) => {
            return (
              <li
                className="list-group-item"
                key={task.id}
                onClick={() => onSelectTask(task)}
              >
                <img src={task.icon} alt="icon" style={{ height: "30px" }} />
                &nbsp; {task.name}
                <img
                  src={right_arrow_icon}
                  alt="next"
                  style={{ float: "right" }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TasksListComponent;

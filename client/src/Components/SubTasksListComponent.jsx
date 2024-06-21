import React from "react";
import SubTasksList from "../Constants/SubTasksList";
import right_arrow_icon from "/icons/right_arrow_icon.png";

const SubTasksListComponent = (props) => {
  const subTasksList = SubTasksList();
  const subTasksFilteredList = subTasksList.filter((subTask) => {
    return subTask.taskId === props.selectedTaskId;
  });

  const onSelectSubTask = (selectedOptionItem) => {
    props.selectedSubTask(selectedOptionItem);
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
          {subTasksFilteredList.map((subTask) => {
            return (
              <li
                className="list-group-item"
                key={subTask.id}
                onClick={() => onSelectSubTask(subTask)}
              >
                <img src={subTask.icon} alt="icon" height="30" />
                &nbsp; {subTask.name}
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

export default SubTasksListComponent;

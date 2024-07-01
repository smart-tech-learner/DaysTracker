import React, { useState } from "react";
import TasksListComponent from "./TasksListComponent";
import { Link } from "react-router-dom";
import SubTasksListComponent from "./SubTasksListComponent";
import AddTask from "./AddTask";
import NavBar from "./NavBar";

const AddTaskContainer = () => {
  const [selectedTask, setSelectedTask] = useState();
  const [selectedSubTask, setSelectedSubTask] = useState();

  const [renderTaskSection, setRenderTaskSection] = useState(true);
  const [renderSubTaskSection, setRenderSubTaskSection] = useState(false);
  const [renderDaysTrackerOverview, setRenderDaysTrackerOverview] =
    useState(false);

  const onSelectTask = (selItem) => {
    setSelectedTask(selItem);
    setRenderTaskSection(false);
    setRenderSubTaskSection(true);
  };

  const onSelectSubTask = (selOptionItem) => {
    setSelectedSubTask(selOptionItem);
    setRenderTaskSection(false);
    setRenderSubTaskSection(false);
    setRenderDaysTrackerOverview(true);
  };

  return (
    <div className="container" style={{ paddingTop: "80px" }}>
      <NavBar />
      {!renderDaysTrackerOverview && (
        <div style={{ float: "right" }}>
          <Link to="/home" className="btn btn-danger">
            Cancel
          </Link>
        </div>
      )}
      {!renderDaysTrackerOverview &&
        (renderTaskSection ? (
          <h3>What do you want to do?</h3>
        ) : (
          <h3>{selectedTask.task}</h3>
        ))}
      {renderTaskSection && <TasksListComponent selectedTask={onSelectTask} />}
      {renderSubTaskSection && (
        <SubTasksListComponent
          selectedTaskId={selectedTask.id}
          selectedSubTask={onSelectSubTask}
        />
      )}
      {renderDaysTrackerOverview && (
        <AddTask
          selectedTask={selectedTask}
          selectedSubTask={selectedSubTask}
        />
      )}
    </div>
  );
};

export default AddTaskContainer;

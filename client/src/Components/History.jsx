import React from "react";
import NavBar from "./NavBar";
import { addedItemsList, useAllTasksContext } from "../Pages/Dashboard";
import TaskDisplayCard from "./TaskDisplayCard";
import no_tasks_image from "/images/no_tasks.jpg";
import { useUserContext } from "./DashboardLayout";

const History = (props) => {
  const { tasks } = useAllTasksContext();
  console.log(tasks);
  const inactiveTasks = addedItemsList.filter(
    (task) => task.status === "completed" || task.status === "stopped"
  );

  return (
    <div
      className="container"
      style={{ paddingTop: "80px", marginBottom: "200px" }}
    >
      <NavBar />
      <h2>History</h2>
      <br></br>
      {inactiveTasks.length == 0 ? (
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
        inactiveTasks.map((item) => {
          return (
            <TaskDisplayCard
              itemDetails={item}
              key={item.id}
              viewAs="history"
            />
          );
        })
      )}
    </div>
  );
};

export default History;

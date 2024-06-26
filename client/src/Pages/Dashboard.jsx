import React, { useContext, useState } from "react";
import add_icon from "/icons/add_icon.png";
import { Link, useLoaderData } from "react-router-dom";
import NavBar from "../Components/NavBar";
import bot from "/icons/bot.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AiInsight from "../Components/AiInsight";
import axios from "axios";
import { toast } from "react-toastify";
import { createContext } from "react";
import SectionContainer from "../Components/SectionContainer";
import TasksDisplayContainer from "../Components/TasksDisplayContainer";

export const addedItemsList = [];

export const loader = async ({ request }) => {
  try {
    const { data } = await axios.get("/api/v1/daysTracker/tasks");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllTasksContext = createContext();

const Dashboard = () => {
  const allTasks = useLoaderData();

  const [filteredTask, setFilteredTask] = useState(
    allTasks.tasks.filter((task) => task.status === "in-progress")
  );

  const selectedStatusToFilter = (status) => {
    let tasks = [];
    if (status === "total") {
      tasks = allTasks.tasks;
    } else {
      tasks = allTasks.tasks.filter((task) => task.status === status);
    }
    setFilteredTask([...tasks]);
  };

  return (
    <AllTasksContext.Provider value={{ allTasks }}>
      <NavBar />
      <div
        className="container"
        style={{ paddingTop: "80px", paddingBottom: "200px" }}
      >
        <div>
          <div style={{ float: "right" }}>
            <Link to="addTask">
              <img src={add_icon} alt="task" />
            </Link>
          </div>
          <h2>Dashboard</h2>
        </div>
        <br></br>
        <SectionContainer selectedStatusToFilter={selectedStatusToFilter} />
        <hr></hr>
        <TasksDisplayContainer filteredTaskByStatus={filteredTask} />
        <div
          style={{
            position: "fixed",
            bottom: "0",
            right: "0",
          }}
        >
          <Popup
            style={{ width: "500px" }}
            trigger={<img src={bot} alt="task" />}
            position="left bottom"
          >
            <AiInsight />
          </Popup>
        </div>
      </div>
    </AllTasksContext.Provider>
  );
};

export const useAllTasksContext = () => useContext(AllTasksContext);
export default Dashboard;

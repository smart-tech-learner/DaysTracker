import React, { useContext, useState } from "react";
import add_icon from "/icons/add_icon.png";
import search_icon from "/icons/search_icon.png";
import { Link, useLoaderData } from "react-router-dom";
import NavBar from "../Components/NavBar";
import no_tasks_image from "/images/no_tasks.jpg";
import bot from "/icons/bot.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AiInsight from "../Components/AiInsight";
import Search from "../Components/Search";
import TaskDisplayCard from "../Components/TaskDisplayCard";
import axios from "axios";
import { toast } from "react-toastify";
import { createContext } from "react";
import { useUserContext } from "../Components/DashboardLayout";

export const addedItemsList = [];

export const loader = async ({ request }) => {
  try {
    const { data } = await axios.get("/api/v1/daysTracker/tasks");
    return data.tasks;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllTasksContext = createContext();

const Dashboard = () => {
  const allTasks = useLoaderData();
  const [displaySearch, setDisplaySearch] = useState(false);

  const { user } = useUserContext();
  console.log("user data in dashboard::: " + user);

  const closeSearch = () => {
    setDisplaySearch(false);
  };

  return (
    <AllTasksContext.Provider value={allTasks}>
      <NavBar />
      <div
        className="container"
        style={{ paddingTop: "80px", paddingBottom: "200px" }}
      >
        <div>
          <div style={{ float: "right" }}>
            <Link>
              <img
                src={search_icon}
                alt="task"
                onClick={() => setDisplaySearch(!displaySearch)}
              />
            </Link>
            &nbsp; &nbsp;
            <Link to="addTask">
              <img src={add_icon} alt="task" />
            </Link>
          </div>
          <h2>Today</h2>
        </div>
        <br></br>

        {allTasks.length == 0 ? (
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
            {displaySearch && <Search closeSearch={closeSearch} />}
            {allTasks &&
              allTasks.map((item) => {
                return (
                  <TaskDisplayCard
                    itemDetails={item}
                    key={item.id}
                    viewAs="dashboard"
                  />
                );
              })}
          </div>
        )}
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

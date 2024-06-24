import axios from "axios";
import React, { createContext, useContext } from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await axios.get("/api/v1/daysTracker/users/currentUser");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const UserContext = createContext();
const DashboardLayout = () => {
  const user = useLoaderData();

  return (
    <UserContext.Provider value={{ user }}>
      <Outlet context={{ user }} />
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export default DashboardLayout;

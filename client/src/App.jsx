import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./Pages/Landing";
import HomeLayout from "./Components/HomeLayout";
import Dashboard, { loader as dashboardLoader } from "./Pages/Dashboard";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTaskContainer from "./Components/AddTaskContainer";
import DashboardLayout from "./Components/DashboardLayout";
import Statistics from "./Pages/Statistics";
import { action as RegisterAction } from "./Pages/Register";
import { action as LoginAction } from "./Pages/Login";
import TaskDetails from "./Components/TaskDetails";
import { loader as taskDetailsLoader } from "./Components/TaskDetails";
import Settings from "./Pages/Settings";
import History from "./Components/History";
import { loader as dashboardLayoutLoader } from "./Components/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: RegisterAction,
      },
      {
        path: "login",
        element: <Login />,
        action: LoginAction,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLayoutLoader,
        children: [
          {
            index: true,
            element: <Dashboard />,
            loader: dashboardLoader,
          },
          {
            path: "addTask",
            element: <AddTaskContainer />,
          },
          {
            path: "taskDetails/:id",
            element: <TaskDetails />,
            loader: taskDetailsLoader,
          },
          {
            path: "history",
            element: <History />,
          },
        ],
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

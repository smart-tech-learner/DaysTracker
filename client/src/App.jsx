import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./Pages/Landing";
import HomeLayout from "./Components/HomeLayout";
import Tasks, { loader as tasksLoader } from "./Pages/Tasks";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTaskContainer from "./Components/AddTaskContainer";
import TasksLayout from "./Components/TasksLayout";
import { action as RegisterAction } from "./Pages/Register";
import { action as LoginAction } from "./Pages/Login";
import TaskDetails from "./Components/TaskDetails";
import { loader as taskDetailsLoader } from "./Components/TaskDetails";
import Settings from "./Pages/Settings";
import { loader as tasksLayoutLoader } from "./Components/TasksLayout";

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
        path: "tasks",
        element: <TasksLayout />,
        loader: tasksLayoutLoader,
        children: [
          {
            index: true,
            element: <Tasks />,
            loader: tasksLoader,
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
        ],
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

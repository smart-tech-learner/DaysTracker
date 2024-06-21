import React from "react";
import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import logo from "/icons/logo.png";
import avatar_m from "/icons/avatar_m.png";
import axios from "axios";
import { toast } from "react-toastify";

const NavBar = () => {
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      await axios.get("/api/v1/daysTracker/auth/logout");
      toast.success("logged out successfully!");
      return navigate("/login");
    } catch (error) {
      return error;
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <img src={logo} alt="logo" style={{ height: "30px" }} href="/" />
        &nbsp;
        <NavLink className="navbar-brand" to="/">
          Days Tracker
        </NavLink>
        <button
          className="navbar-toggler shadow-none border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* sidebar */}
        <div
          className="sidebar offcanvas offcanvas-start text-bg-dark"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          {/* Sidebar header */}
          <div className="offcanvas-header text-white border-bottom">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Days Tracker
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
            <ul className="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/history">
                  History
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/statistics">
                  Statistics
                </Link>
              </li>
            </ul>
            <div style={{ display: "flex" }}>
              <img src={avatar_m} alt="logo" style={{ height: "40px" }} />
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Prasana Kumar
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/settings">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" onClick={logoutUser}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {/* <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3">
              <NavLink className="text-white" to="/login">
                Login
              </NavLink>
              <button
                className="text-white text-decoration-none px-3 py-1 rounded-4"
                style={{ backgroundColor: "green" }}
              >
                <NavLink className="text-white" to="/register">
                  Register
                </NavLink>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
    // <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //   <div className="collapse navbar-collapse" id="navbarNavDropdown">
    //     <ul className="navbar-nav">
    //       <li className="nav-item dropdown">
    //         <a
    //           className="nav-link dropdown-toggle"
    //           href="#"
    //           role="button"
    //           data-bs-toggle="dropdown"
    //           aria-expanded="false"
    //         >
    //           Prasana Kumar
    //         </a>
    //         <ul className="dropdown-menu">
    //           <li>
    //             <a className="dropdown-item" href="#">
    //               Settings
    //             </a>
    //           </li>
    //           <li>
    //             <a className="dropdown-item" href="#">
    //               Logout
    //             </a>
    //           </li>
    //         </ul>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
};

export default NavBar;

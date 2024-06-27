import React, { useState } from "react";
import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import logo from "/icons/logo.png";
import track_icon from "/icons/track_icon.png";
import avatar_m from "/icons/avatar_m.png";
import avatar_w from "/icons/avatar_w.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "./TasksLayout";
import ChangePasswordModal from "./ChangePasswordModal";

const NavBar = () => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const { user } = useUserContext();
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

  const onClickChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <ChangePasswordModal
        show={showChangePasswordModal}
        handleClose={() => setShowChangePasswordModal(!showChangePasswordModal)}
      />
      <div className="container">
        <img src={logo} alt="logo" style={{ height: "30px" }} href="/" />
        &nbsp;
        <NavLink className="navbar-brand" to="/">
          Infinity-Days Tracker
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
              Infinity-Days Tracker
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
                <div style={{ display: "flex" }}>
                  <img src={track_icon} alt="track" height="30" />
                  <h5 style={{ fontStyle: "italic" }}>Track on the GO....</h5>
                </div>
              </li>
            </ul>
            <div style={{ display: "flex" }}>
              {user.user.gender === "male" ? (
                <img src={avatar_m} alt="logo" style={{ height: "40px" }} />
              ) : (
                <img src={avatar_w} alt="logo" style={{ height: "40px" }} />
              )}
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.user.firstName}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={onClickChangePassword}
                      >
                        Change Password
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Landing.css";
import login_image from "/images/login_image.svg";

const Landing = () => {
  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
            <h1
              className="my-5 display-5 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              The best <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                simple day counter
              </span>
            </h1>
            <p
              className="mb-4 opacity-70"
              style={{ color: "hsl(218, 81%, 85%)" }}
            >
              Quit smoking, drinking and other bad habits. Keep track of happy
              moments in your life. Remember your errands. Form good habits by
              seeing the...
              <br></br>
              LAST TIME YOU DID IT
            </p>
          </div>
          <div className="col-lg-5 mb-5 mb-lg-1 position-relative">
            <img src={login_image} alt="login" style={{ height: "340px" }} />
          </div>
          <div style={{ display: "flex" }}>
            <div className="pt-1 mb-4">
              <NavLink
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-light btn-lg btn-block"
                type="su"
                to="/login"
              >
                Login
              </NavLink>
            </div>
            &nbsp;
            <div className="pt-1 mb-4">
              <NavLink
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-light btn-lg btn-block"
                type="su"
                to="/register"
              >
                Register
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;

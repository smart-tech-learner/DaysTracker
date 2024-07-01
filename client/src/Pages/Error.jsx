import React from "react";
import error from "/images/error.svg";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div style={{ paddingTop: "100px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "350px",
          borderRadius: "2rem",
        }}
      >
        <img src={error} alt="alt" />
      </div>
      <br></br>
      <h3 style={{ display: "flex", justifyContent: "center", color: "red" }}>
        Something went wrong.
      </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/home">back home</Link>
      </div>
    </div>
  );
};

export default Error;

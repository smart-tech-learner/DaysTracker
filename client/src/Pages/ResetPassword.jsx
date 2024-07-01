import React, { useState } from "react";
import { Form, Link, NavLink, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormLabel from "../Components/FormLabel";
import FormInput from "../Components/FormInput";
import axios from "axios";
import show_password_icon from "/icons/show_password_icon.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState("");
  const [formDetails, setFormDetails] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const changeFormDetails = (event) => {
    const { name, value } = event.target;

    setFormDetails({ ...formDetails, [name]: value });
  };

  const resetPassword = async (event) => {
    event.preventDefault();
    const errors = validateForm();

    if (errors && Object.keys(errors).length === 0) {
      try {
        await axios.patch("api/v1/daysTracker/resetPassword", formDetails);
        toast.success("Password reset successful.");
        return navigate("/login");
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    }
  };

  function validateForm() {
    var errors = {};

    if (!formDetails.email && formDetails.email.trim().length === 0) {
      errors.email = "Email is required.";
    }

    if (
      !formDetails.newPassword &&
      formDetails.newPassword.trim().length === 0
    ) {
      errors.newPassword = "Password is required.";
    }

    if (
      !formDetails.confirmNewPassword &&
      formDetails.confirmNewPassword.trim().length === 0
    ) {
      errors.confirmNewPassword = "Confirm password is required.";
    }
    setFormErrors(errors);
    return errors;
  }

  const [showNewPassword, setShowNewPassword] = useState(false);

  const onClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const onClickShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "9A616D" }}>
        <div className="container py-4 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-6">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-12 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <Form method="post">
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Reset Password
                        </h5>
                        <div style={{ display: "grid" }}>
                          <div className="form-outline mb-4">
                            <FormLabel
                              name="email"
                              labelText="Enter your registered email address"
                            />
                            <FormInput
                              type="email"
                              name="email"
                              value={formDetails.email}
                              onChange={changeFormDetails}
                            />
                            <div style={{ color: "red" }}>
                              {formErrors.email}
                            </div>
                          </div>
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <FormLabel
                            name="newPassword"
                            labelText="Enter new password"
                          />
                          <div className="input-group">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              id="newPassword"
                              name="newPassword"
                              className="form-control"
                              value={formDetails.newPassword}
                              onChange={changeFormDetails}
                            />
                            <div className="input-group-append">
                              <img
                                style={{ border: "1px solid darkgrey" }}
                                src={show_password_icon}
                                alt="show"
                                height="38"
                                onClick={onClickShowNewPassword}
                              />
                            </div>
                          </div>
                          <div style={{ color: "red" }}>
                            {formErrors.newPassword}
                          </div>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <FormLabel
                            name="confirmNewPassword"
                            labelText="Confirm password"
                          />
                          <div className="input-group">
                            <input
                              type={
                                showConfirmNewPassword ? "text" : "password"
                              }
                              id="confirmNewPassword"
                              name="confirmNewPassword"
                              className="form-control"
                              value={formDetails.confirmNewPassword}
                              onChange={changeFormDetails}
                            />
                            <div className="input-group-append">
                              <img
                                style={{ border: "1px solid darkgrey" }}
                                src={show_password_icon}
                                alt="show"
                                height="38"
                                onClick={onClickShowConfirmNewPassword}
                              />
                            </div>
                          </div>
                          <div style={{ color: "red" }}>
                            {formErrors.confirmNewPassword}
                          </div>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            type="submit"
                            className="btn btn-dark btn-lg btn-block"
                            onClick={resetPassword}
                          >
                            Reset Password
                          </button>
                        </div>

                        <p
                          className="mb-1 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <NavLink to="/register" style={{ color: "#393f81" }}>
                            Register here
                          </NavLink>
                        </p>
                        <p
                          className="mb-1 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Already have an account?{" "}
                          <NavLink to="/login" style={{ color: "#393f81" }}>
                            Login here
                          </NavLink>
                        </p>
                        <p
                          className="mb-2 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Visit our site here{" "}
                          <NavLink to="/" style={{ color: "#393f81" }}>
                            home
                          </NavLink>
                        </p>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;

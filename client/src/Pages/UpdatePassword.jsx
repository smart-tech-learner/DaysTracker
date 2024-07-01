import NavBar from "../Components/NavBar";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import show_password_icon from "/icons/show_password_icon.png";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [changePasswordValues, setChangePasswordValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [formErrors, setFormErrors] = useState("");

  const onChangePasswordDetails = (event) => {
    const { name, value } = event.target;
    setChangePasswordValues({ ...changePasswordValues, [name]: value });
  };

  const cancelChangePasswordModal = () => {
    navigate("/home");
  };

  const saveUpdateUserPassword = async (event) => {
    event.preventDefault();

    var errors = validateForm();

    if (errors && Object.keys(errors).length === 0) {
      try {
        await axios.patch(
          "/api/v1/daysTracker/users/updatePassword",
          changePasswordValues
        );
        toast.success("Password updated successfully");
        navigate("/home");
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    }
  };

  function validateForm() {
    var errors = {};

    if (
      !changePasswordValues.oldPassword ||
      changePasswordValues.oldPassword.trim().length === 0
    ) {
      errors.oldPassword = "Old Password is required.";
    }

    if (
      !changePasswordValues.newPassword ||
      changePasswordValues.newPassword.trim().length === 0
    ) {
      errors.newPassword = "New Password is required.";
    }
    setFormErrors(errors);

    if (
      !changePasswordValues.confirmNewPassword ||
      changePasswordValues.confirmNewPassword.trim().length === 0
    ) {
      errors.confirmNewPassword = "Confirm New Password is required.";
    }
    setFormErrors(errors);
    return errors;
  }

  const [showOldPassword, setShowOldPassword] = useState(false);

  const onClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

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
      <NavBar />
      <div className="container" style={{ paddingTop: "100px" }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <h4>Update Password</h4>
          <div className="col col-xl-8">
            <div
              className="card"
              style={{
                borderRadius: "1rem",
                padding: "50px",
                marginTop: "40px",
              }}
            >
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="oldPassword"
                    className="form-label"
                    style={{ color: "brown" }}
                  >
                    Old Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      id="oldPassword"
                      name="oldPassword"
                      className="form-control"
                      onChange={onChangePasswordDetails}
                      value={changePasswordValues.oldPassword}
                    />
                    <div className="input-group-append">
                      <img
                        style={{ border: "1px solid darkgrey" }}
                        src={show_password_icon}
                        alt="show"
                        height="38"
                        onClick={onClickShowOldPassword}
                      />
                    </div>
                  </div>
                  <div style={{ color: "red" }}>{formErrors.oldPassword}</div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="newPassword"
                    className="form-label"
                    style={{ color: "brown" }}
                  >
                    New Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      className="form-control"
                      onChange={onChangePasswordDetails}
                      value={changePasswordValues.newPassword}
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
                  <div style={{ color: "red" }}>{formErrors.newPassword}</div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="confirmNewPassword"
                    className="form-label"
                    style={{ color: "brown" }}
                  >
                    Confirm New Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showConfirmNewPassword ? "text" : "password"}
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      className="form-control"
                      onChange={onChangePasswordDetails}
                      value={changePasswordValues.confirmNewPassword}
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

                <div
                  className="grid"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={saveUpdateUserPassword}
                  >
                    Submit
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cancelChangePasswordModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;

import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangePassword = (props) => {
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

  const closeChangePasswordModal = () => {
    props.handleClose();
  };

  const saveUpdateUserPassword = async (event) => {
    event.preventDefault();

    var errors = validateForm();

    if (errors && Object.keys(errors).length === 0) {
      try {
        await axios.patch(
          "api/v1/daysTracker/users/updatePassword",
          changePasswordValues
        );
        toast.success("Password updated successfully");
        props.handleClose();
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

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="oldPassword" className="form-label">
          Old Password
        </label>
        <input
          type="password"
          className="form-control"
          id="oldPassword"
          name="oldPassword"
          onChange={onChangePasswordDetails}
          value={changePasswordValues.oldPassword}
        />
        <div style={{ color: "red" }}>{formErrors.oldPassword}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="newPassword" className="form-label">
          New Password
        </label>
        <input
          type="password"
          className="form-control"
          id="newPassword"
          name="newPassword"
          onChange={onChangePasswordDetails}
          value={changePasswordValues.newPassword}
        />
        <div style={{ color: "red" }}>{formErrors.newPassword}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="confirmNewPassword" className="form-label">
          Confirm New Password
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmNewPassword"
          name="confirmNewPassword"
          onChange={onChangePasswordDetails}
          value={changePasswordValues.confirmNewPassword}
        />
        <div style={{ color: "red" }}>{formErrors.confirmNewPassword}</div>
      </div>

      <div style={{ float: "right" }}>
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
          onClick={closeChangePasswordModal}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;

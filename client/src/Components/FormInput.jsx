import React from "react";

const FormInput = ({ type, name, onChange, value, placeholder }) => {
  return (
    <input
      type={type}
      id={name}
      name={name}
      className="form-control"
      value={value}
      placeholder={placeholder || ""}
      onChange={onChange}
      required
    />
  );
};

export default FormInput;

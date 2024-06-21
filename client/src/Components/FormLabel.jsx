import React from "react";

const FormLabel = ({ name, labelText }) => {
  return (
    <label className="form-label" htmlFor={name}>
      {labelText}
    </label>
  );
};

export default FormLabel;

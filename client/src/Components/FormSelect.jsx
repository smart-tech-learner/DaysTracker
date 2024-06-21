import React from "react";

const FormSelect = ({ name, value, onChange, list }) => {
  return (
    <select
      className="form-select"
      required
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    >
      {list.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default FormSelect;

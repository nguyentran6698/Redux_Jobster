import React from "react";

const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        className="form-select"
        name={name}
        id={name}
        onChange={handleChange}
        value={value}
      >
        {list.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;

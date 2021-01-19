import React from "react";
import "./RadioSelector.css";

export default function RadioSelector({
  name,
  options,
  propValue,
  onChange,
  error,
}) {
  return (
    <div className="RadioSelector">
      <fieldset className="inputs">
        <legend>Gender:</legend>
        {options?.map(({ value, label }) => {
          return (
            <div className="radioOption" key={value}>
              <label htmlFor={value}>{label}</label>
              <input
                type="radio"
                name={name}
                id={value}
                value={value}
                checked={propValue === value}
                onChange={onChange}
              />
            </div>
          );
        })}
      </fieldset>
      {error && <i className="fas fa-exclamation-triangle error-icon"></i>}
    </div>
  );
}

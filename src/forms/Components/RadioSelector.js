import React from "react";
import './RadioSelector.css'

export default function RadioSelector({
  name,
  options,
  propValue,
  onChange,
  error,
}) {
  return (
    <div className="RadioSelector">
      <div className="inputs">
        {options?.map(({ value, label }) => {
          return (
            <div className='radioOption' key={value}>
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
      </div>
        {error && <i class="fas fa-exclamation-triangle error-icon"></i>}
    </div>
  );
}

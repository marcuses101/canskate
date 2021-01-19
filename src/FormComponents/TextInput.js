import React from "react";
import "./TextInput.css";

export default function TextInput({ id, label, max, value, error, onChange }) {
  return (
    <>
      <div className={`TextInput`}>
        <label className={value && "scale"} htmlFor={id}>
          {label}
        </label>
        <input
          autoComplete="off"
          maxLength={max || ""}
          id={id}
          type="text"
          value={value}
          onChange={onChange}
        />
        {error && <i className="fas fa-exclamation-triangle error-icon"></i>}
      </div>
    </>
  );
}

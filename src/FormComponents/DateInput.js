import React from "react";

export default function DateInput({ id, label, value, error, onChange }) {
  return (
    <div className={`DateInput ${error && "error"}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="date" value={value} onChange={onChange} />
      {error && <i className="fas fa-exclamation-triangle error-icon"></i>}
    </div>
  );
}

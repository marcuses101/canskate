import React from "react";
import "./TextInput.css";

export default function TextInput({ id, label, value, error, onChange }) {
  return (
    <div className={`TextInput ${error && "error"}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" value={value} onChange={onChange}/>
      {error && <i class="fas fa-exclamation-triangle error-icon"></i>}
    </div>
  );
}

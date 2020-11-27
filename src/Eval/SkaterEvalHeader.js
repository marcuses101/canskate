import React from "react";

export default function SkaterEvalHeader({ name, filterOpen, toggleFilterOpen }) {
  return (
    <header className="SkaterEvalHeader">
      <div>☰</div>
      <h2>{name}</h2>
      <div onClick={toggleFilterOpen}>
        {filterOpen ? (
          <i class="fas fa-chevron-up"></i>
        ) : (
          <i className="fas fa-chevron-down"></i>
        )}
      </div>
    </header>
  );
}

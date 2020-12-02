import React, { useContext } from "react";
import Context from "../Context";

export default function HeaderContent({title}) {
  const {isFilterOpen, setIsFilterOpen } = useContext(Context);
  return (
    <header className="SkaterEvalHeader">
      <div>☰</div>
      <h2>{title}</h2>
      <div onClick={() => setIsFilterOpen((bool) => !bool)}>
        {isFilterOpen ? (
          <i className="fas fa-chevron-up"></i>
        ) : (
          <i className="fas fa-chevron-down"></i>
        )}
      </div>
    </header>
  );
}
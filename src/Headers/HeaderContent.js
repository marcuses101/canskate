import React, { useContext } from "react";
import Context from "../Context";

export default function HeaderContent({ title, openNav ,showFilter}) {
  const { isFilterOpen, setIsFilterOpen } = useContext(Context);
  return (
    <header className="SkaterEvalHeader">
      <div className="menu" onClick={openNav}>
        ☰
      </div>
      <h2>{title}</h2>
     {showFilter && <div className="filter" onClick={() => setIsFilterOpen((bool) => !bool)}>
        <h4>Filter</h4>
        {isFilterOpen ? (
          <i className="fas fa-chevron-up"></i>
        ) : (
          <i className="fas fa-chevron-down"></i>
        )}
      </div>}
    </header>
  );
}

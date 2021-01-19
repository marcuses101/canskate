import React, { useContext, useEffect } from "react";
import Context from "../Context";
import useSkaterFromParamId from "../Hooks/useSkaterFromParamId";

export default function HeaderContent({ title, showFilter, hideMenu }) {
  const { isFilterOpen, setIsFilterOpen, setIsNavOpen } = useContext(Context);
  const { fullname } = useSkaterFromParamId();
  useEffect(() => {
    if (showFilter) {
      document.body.classList.add("filter");
    } else {
      document.body.classList.remove("filter");
    }
    return () => {
      document.body.classList.remove("filter");
    };
  }, [showFilter]);

  return (
    <header className="SkaterEvalHeader">
      {!hideMenu ? (
        <div className="menu" onClick={() => setIsNavOpen(true)}>
          ☰
        </div>
      ) : (
        <div></div>
      )}
      <h1>{title || fullname}</h1>
      {showFilter && (
        <div
          className="filter"
          onClick={() => setIsFilterOpen((bool) => !bool)}
        >
          <h4>Filter</h4>
          {isFilterOpen ? (
            <i className="fas fa-chevron-up"></i>
          ) : (
            <i className="fas fa-chevron-down"></i>
          )}
        </div>
      )}
    </header>
  );
}

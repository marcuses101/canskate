import React, { useContext } from "react";
import useSkaterFromParamId from '../Hooks/useSkaterFromParamId'
import Context from "../Context";

export default function SkaterEvalHeader() {
  const {isFilterOpen, setIsFilterOpen } = useContext(Context);
  const skater = useSkaterFromParamId();
  return (
    <header className="SkaterEvalHeader">
      <div>☰</div>
      <h2>{skater.fullname}</h2>
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

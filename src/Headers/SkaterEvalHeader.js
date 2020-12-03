import React, { useContext } from "react";
import useSkaterFromParamId from '../Hooks/useSkaterFromParamId'
import Context from "../Context";

export default function SkaterEvalHeader({openNav}) {
  const {isFilterOpen, setIsFilterOpen } = useContext(Context);
  const skater = useSkaterFromParamId();
  return (
    <header className="SkaterEvalHeader">
      <div className='menu' onClick={openNav}>☰</div>
      <h2>{skater.fullname}</h2>
      <div className='filter' onClick={() => setIsFilterOpen((bool) => !bool)}>
        <h4>Filter</h4>
        {isFilterOpen ? (
          <i className="fas fa-chevron-up"></i>
        ) : (
          <i className="fas fa-chevron-down"></i>
        )}
      </div>
    </header>
  );
}

import React, { useContext, useEffect, useRef } from "react";
import useSkaterFromParamId from '../Hooks/useSkaterFromParamId'
import Context from "../Context";

export default function SkaterEvalHeader({openNav}) {
  const {isFilterOpen, setIsFilterOpen } = useContext(Context);
  const skater = useSkaterFromParamId();
  const render = useRef(null)

  useEffect(() => {
    if (render.current) document.body.classList.add('filter')
    return () => {
      document.body.classList.remove('filter')
    }
  },[render])



  return (
    <header ref={render} className="SkaterEvalHeader">
      <div className='menu' onClick={openNav}>☰</div>
      <h2>{skater.fullname?skater.fullname:'Skater Evaluation'}</h2>
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

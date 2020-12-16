import React, { useContext, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Context from "../Context";
import "./DistributionFilter.css";

export default function DistributionFilter({showAll, setShowAll }) {
  const filter = useRef(null);
  const { isFilterOpen } = useContext(Context);
  const resize = new ResizeObserver(([entry]) => {
    if (isFilterOpen) {
      const offset = entry.borderBoxSize[0].blockSize;
      document.documentElement.style.setProperty(
        "--filter-offset",
        `${offset}px`
      );
    }
  });

  useEffect(() => {
    const target = filter.current;
    resize.observe(target);
    return () => {
      resize.unobserve(target);
    };
  });

  useEffect(()=>()=>document.documentElement.style.setProperty('--filter-offset','0px'))

  return (
    <div ref={filter} className="DistributionFilter">
      <span className={!showAll?'active':''} onClick={() => setShowAll(false)}>To distribute</span>
      <span className={showAll?'active':''} onClick={() => setShowAll(true)}>All</span>
    </div>
  );
}

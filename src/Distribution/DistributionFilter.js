import React, { useContext, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Context from "../Context";
import "./DistributionFilter.css";

export default function DistributionFilter({showAll, setShowAll }) {


  return (
    <div className="DistributionFilter">
      <span className={!showAll?'active':''} onClick={() => setShowAll(false)}>To distribute</span>
      <span className={showAll?'active':''} onClick={() => setShowAll(true)}>All</span>
    </div>
  );
}

import React, {useContext, useEffect} from "react";
import Context from "../Context"

export default function SkaterListHeader() {
  const {isFilterOpen, setIsFilterOpen} = useContext(Context)
  useEffect(()=>{
    return ()=>{
      setIsFilterOpen(false)
    }
  },[setIsFilterOpen])

  return (
    <header className="SkaterEvalHeader">
      <div>☰</div>
      <h2>Element List</h2>
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
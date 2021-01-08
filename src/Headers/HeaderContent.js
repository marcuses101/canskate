import React, { useContext , useEffect} from "react";
import Context from "../Context";

export default function HeaderContent({ title, openNav ,showFilter, hideMenu}) {
  const { isFilterOpen, setIsFilterOpen } = useContext(Context);


  // animate main margin top
  useEffect(() => {
    if (showFilter) {document.body.classList.add('filter')}
    else {document.body.classList.remove('filter')}
    return () => {
      document.body.classList.remove('filter')
    }
  }, [showFilter])

  return (
    <header className="SkaterEvalHeader">
      {!hideMenu?<div className="menu" onClick={openNav}>
        ☰
      </div>:<div></div>}
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

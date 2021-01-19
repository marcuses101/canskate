import React, { useLayoutEffect, useRef, useContext } from "react";
import Context from "../Context";

export default function Resize(props) {
  const filter = useRef(null);
  const { isFilterOpen } = useContext(Context);

  useLayoutEffect(() => {
    if (isFilterOpen && filter.current) {
      const offset = filter.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--filter-offset",
        `${offset}px`
      );
    }
  }, [isFilterOpen]);

  return (
    <div ref={filter} className="Resize">
      {props.children}
    </div>
  );
}

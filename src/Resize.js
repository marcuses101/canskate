import React, {useEffect, useRef, useContext} from "react"
import Context from './Context'

 export default function Resize(props){
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
     <div ref={filter} className="Resize">
      {props.children}
     </div>
   )
 }
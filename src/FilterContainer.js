import React, { useContext } from "react"
import Context from "./Context";
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import './FilterContainer.css'


export function FilterContainer(props){
   const {isFilterOpen} = useContext(Context)
   return (
    <TransitionGroup className='FilterContainer'>
    {isFilterOpen && (
      <CSSTransition
        in={isFilterOpen}
        timeout={100}
        classNames="slide"
        onExit={() => {
          document.documentElement.style.setProperty(
            "--filter-offset",
            "0px"
          );
        }}
      >
        {props.children}
      </CSSTransition>
    )}
  </TransitionGroup>
   )
 }
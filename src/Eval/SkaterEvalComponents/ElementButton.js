import React, { useState } from "react";
import useSkaterFromParamId from "../../Hooks/useSkaterFromParamId";
import {useLogElement} from '../../Hooks/useLogElement'
import {Transition} from 'react-transition-group'
import './ElementButton.css'


export default function ElementButton({ element, style }) {
  const skater = useSkaterFromParamId();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const logElement = useLogElement(skater.id, element.element_id)

const duration = 0;

const defaultStyle = {
  transition: `transform ${duration}ms ease`,
  transform: 'translateX(3rem)'
}

const transitionStyles = {
  entering: { transform: 'translateX(3rem)' },
  entered:  { transform: 'translateX(0rem)' },
  exiting:  { transform: 'translateX(0rem)' },
  exited: { transform: 'translateX(3rem)' }
};

  return (
    <li
      className="ElementButton"
      onClick={async (e) => {
            e.stopPropagation();
           await logElement();}}
      onMouseEnter={() => setConfirmOpen(true)}
      onMouseLeave={()=> {
        setConfirmOpen(false)}}
      style={style}
    >
      <div>{element.element}</div>
      <Transition in={confirmOpen} timeout={duration}>
         {state=>(<button
          onClick={(e) => {
            e.stopPropagation();
            logElement();
          }}
          style={{...defaultStyle,...transitionStyles[state]}}
        >
          ✓
        </button>)}
      </Transition>

    </li>
  );
}

import React, { useContext } from "react";
import { createPortal } from "react-dom";
import Context from "../Context";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Resize from "./Resize";
import "./FilterContainer.css";

export function FilterContainer(props) {
  const { isFilterOpen } = useContext(Context);
  const container = document.getElementById("filterContainer");
  // using a portal to prevent layout shift when sidenav applies a visual filter effect
  return createPortal(
    <TransitionGroup className="FilterContainer">
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
          <Resize>{props.children}</Resize>
        </CSSTransition>
      )}
    </TransitionGroup>,
    container
  );
}

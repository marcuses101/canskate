import React from "react";

import "./FundamentalArticle.css";
import {
  TransitionGroup,
  Transition,
  SwitchTransition,
} from "react-transition-group";

export default function FundamentalArticle({ fundamental, badge, elements }) {
  const duration = 250;

  const defaultStyle = {
    transition: `left ${duration}ms ease`,
    position: "relative",
    left: "0rem",
  };

  const transitionStyles = {
    entering: { left: "30rem" },
    entered: { left: "0rem" },
    exiting: { left: "-30rem" },
    exited: { left: "-30rem" },
  };


  return (
    <article className="FundamentalArticle">
      <header style={{ backgroundColor: `var(--${fundamental})` }}>
        <h4>{`${fundamental} ${badge}`}</h4>
      </header>
      <SwitchTransition>
        {elements.length ? (
          <Transition key="elements" timeout={duration}>
            {(state) => (
              <TransitionGroup
                style={{ ...defaultStyle, ...transitionStyles[state] }}
                component="ul"
              >
                {elements.map((element) => (
                  <Transition key={element.element_id} timeout={duration}>
                    {(state) => (
                      <div>{element.element}</div>
                    )}
                  </Transition>
                ))}
              </TransitionGroup>
            )}
          </Transition>
        ) : (
          <Transition key="complete" timeout={100}>
            {(state) => (
              <div
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transitionDuration:'100ms'
                }}
              >
                All ribbon elements complete!
              </div>
            )}
          </Transition>
        )}
      </SwitchTransition>
    </article>
  );
}

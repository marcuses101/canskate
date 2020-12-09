import React, { Fragment } from "react";
import ElementButton from './ElementButton'
export default function FundamentalElementList({ fundamental, elements }) {
  const badgeItems = [...new Set(elements.map((el) => el.badge))];
  const badgeLists = badgeItems.map((badge) => {
    return (
      <Fragment key={badge + fundamental}>
        <h4>{badge}</h4>
        <ul>
          {elements
            .filter((el) => el.badge === badge)
            .map((el) => (
              <ElementButton
              key={el.element_id}
              element={el}
              />
            ))}
        </ul>
      </Fragment>
    );
  });
  return (
    <>
      <h3>{fundamental}</h3>
      {badgeLists}
    </>
  );
}

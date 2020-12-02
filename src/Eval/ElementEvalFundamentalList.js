import React from "react";
import ElementEvalBadgeList from "./ElementEvalBadgeList";

export default function ElementEvalFundamentalList({
  fundamental,
  badges,
  elements,
  ...rest
}) {
  const badgeItems = badges.map((badge) => {
    const badgeElements = elements.filter((element) => element.badge === badge);
    return (
      <li key={`${badge}${fundamental[0]}`}>
        <ElementEvalBadgeList badge={badge} elements={badgeElements} {...rest}/>
      </li>
    );
  });
  return (
    <>
      <h1>{fundamental}</h1>
      <ul className="badgeList">{badgeItems}</ul>
    </>
  );
}

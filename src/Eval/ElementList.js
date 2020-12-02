import React from "react";
import FundamentalElementList from "./FundamentalElementList";

export default function ElementList({ elements }) {
  const fundamentals = [
    ...new Set(elements.map((element) => element.fundamental)),
  ];
  const FundamentalElementLists = fundamentals.map((fundName) => {
    const filteredElements = elements.filter(
      (el) => el.fundamental === fundName
    );
    return (
      <FundamentalElementList
        key={fundName}
        fundamental={fundName}
        elements={filteredElements}
      />
    );
  });
  return <div className="ElementList">{FundamentalElementLists}</div>;
}

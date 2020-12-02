import React from "react";
import ElementEvalFundamentalList from "./Eval/ElementEvalFundamentalList";

export default function ElementEvalList({ fundamentals, elements, ...rest }) {
  const fundamentalItems = fundamentals.map((fundamental) => {
    const fundamentalElements = elements.filter(
      (element) => element.fundamental === fundamental
    );
    return (
      <li key={fundamental}>
        <ElementEvalFundamentalList
          fundamental={fundamental}
          elements={fundamentalElements}
          {...rest}
        />
      </li>
    );
  });
  return (
    <div className="ElementEvalList">
      <ul>{fundamentalItems}</ul>
    </div>
  );
}

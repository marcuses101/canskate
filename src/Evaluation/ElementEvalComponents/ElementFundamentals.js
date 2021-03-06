import React from "react";
import "./FundamentalArticle.css";
import ElementDropdown from "./ElementDropdown";

export default function FundamentalArticle({
  fundamental,
  badge,
  elements = [],
}) {
  return (
    <article className="ElementFundamentals">
      <h4
        className="ribbonHeader"
        style={{ backgroundColor: `var(--${fundamental})` }}
      >
        {`${fundamental} ${badge}`}
      </h4>

      {elements.length ? (
        elements.map((element) => (
          <ElementDropdown key={element.element_id} element={element} />
        ))
      ) : (
        <div>All ribbon elements complete!</div>
      )}
    </article>
  );
}

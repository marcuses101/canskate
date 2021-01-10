import React from "react";
import ElementFundamentals from "./FundamentalArticle";
import "./BadgeSection.css";

const numberWords = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
};

export default function BadgeSection({
  badge,
  fundamentals = [],
  elements,
}) {
  return (
    <section className="BadgeSection">
      <header className="BadgeSectionHeader">
        <h3>Badge </h3>
        <div
          className="badgeCircle"
          style={{ backgroundColor: `var(--badge-${numberWords[badge]})` }}
        >
          {badge}
        </div>
      </header>
      {fundamentals.map((fund) => (
        <ElementFundamentals
          key={`${badge}${fund}`}
          badge={badge}
          fundamental={fund}
          elements={elements[fund]}
        />
      ))}
    </section>
  );
}

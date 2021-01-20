import React from "react";
import ReportRibbonList from "./ReportRibbonList";
import "./ReportBadge.css";

const numbers = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
};

export default function ReportBadge({ badge, date, ribbons, ...rest }) {
  const badgeRibbons = ribbons?.filter((ribbon) => {
    return ribbon.stage === badge;
  });
  return (
    <article className="ReportBadge">
      <header>
        <div className="badgeName">
          <h2>Badge</h2>
          <div
            className="badgeCircle"
            style={{
              backgroundColor: date
                ? `var(--badge-${numbers[badge]})`
                : "white",
              color: date ? "white" : "black",
              textShadow: date ? "var(--text-shadow)" : "none",
            }}
          >
            {badge}
          </div>
        </div>
        <div className="date">
          <span>Date Completed: </span>
          <span>{date}</span>
        </div>
      </header>

      <ReportRibbonList ribbons={badgeRibbons} {...rest} />
    </article>
  );
}

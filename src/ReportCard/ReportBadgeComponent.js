import React from "react";
import ReportCardBadge from "./ReportCardBadge";
import ReportRibbonList from "./ReportRibbonList";

export default function ReportBadgeComponent({ badge, date, ribbons, ...rest }) {
  const badgeRibbons = ribbons?.filter((ribbon) => {
    return ribbon.stage === badge;
  });
  return (
    <div className="ReportBadgeComponent">
      <ReportCardBadge badge={badge} date={date} />
      <ReportRibbonList ribbons={badgeRibbons} {...rest}/>
    </div>
  );
}

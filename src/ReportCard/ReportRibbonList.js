import React from "react";
import ReportRibbonComponent from "./ReportRibbonComponent";
import dayjs from "dayjs";
export default function ReportRibbonList({ ribbons = [], checkmarks, elements }) {
  const reportRibbons = ribbons.map((ribbon) => {
    const ribbonCheckmarks = checkmarks.filter(
      (checkmark) => checkmark.ribbon_id === ribbon.id
    );
    return (
      <ReportRibbonComponent
        key={ribbon.id}
        ribbon={ribbon}
        checkmarks={ribbonCheckmarks}
        elements={elements}
        date={ribbon.date ? dayjs(ribbon.date).format("DD/MM/YYYY") : null}
      />
    );
  });

  return <div className="ReportRibbonList">{reportRibbons}</div>;
}

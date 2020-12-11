import React from "react";
import ReportCardElement from "./ReportCardElement";
import dayjs from "dayjs";
import './ReportCheckmarkComponent.css'

export default function ReportCheckmarkComponent({ elements ,date}) {
  const elementComponents = elements.map((element) => (
    <ReportCardElement
      key={element.element_id}
      description={element.element}
      date={element.date?dayjs(element.date).format("DD/MM/YYYY"):null}
    />
  ));
  return <div className={`ReportCheckmarkComponent ${date?'complete':''}`}><div className='check'>{date?"✓":null}</div><div>{elementComponents}</div></div>;
}

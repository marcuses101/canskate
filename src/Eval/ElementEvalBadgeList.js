import React from "react";
import ElementEvalElementsDropdown from "./ElementEvalElementDropdown";

export default function ElementEvalBadgeList({ badge, elements, skaters }) {
  const elementItems = elements.map((element, i) => {
    const skatersNotCompleted = skaters.filter(skater=>{
      const elementLog = skater.elementLog.map(log=>log.element_id);
      return !elementLog.includes(element.element_id);
    })
   return (
      <ElementEvalElementsDropdown key={`${element.id}${i}`} element={element} skaters={skatersNotCompleted}/>
  )});
  return (
    <>
      <h2>{badge}</h2>
      <ul>{elementItems}</ul>
    </>
  );
}

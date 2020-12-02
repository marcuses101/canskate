import React from "react";
import ElementEvalElementsDropdown from "./ElementEvalElementDropdown";

export default function ElementEvalBadgeList({ badge, elements, skaters }) {
  const elementItems = elements.map((element, i) => {
    const skatersNotCompleted = skaters.filter(skater=>{
      const elementLog = skater.elementLog.map(log=>log.element_id);
      return !elementLog.includes(element.element_id);
    })
   return (
    <li key={`${element.id}${i}`}>
      <ElementEvalElementsDropdown element={element} skaters={skatersNotCompleted}/>
    </li>
  )});
  return (
    <>
      <h2>{badge}</h2>
      <ul>{elementItems}</ul>
    </>
  );
}

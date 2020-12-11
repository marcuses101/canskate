import React from "react"
import ReportCardRibbon from './ReportCardRibbon'
import ReportCheckmarkList from './ReportCheckmarkList'
 export default function ReportRibbonComponent({ribbon,checkmarks,elements,date}){
   const {fundamental_area, stage, checkmarks_required} = ribbon
   console.log(checkmarks)
   const checkmarksCompleted = checkmarks.reduce((total,checkmark)=>{
     return (checkmark.ribbon_id===ribbon.id && checkmark.date)?total+1:total
   },0)
   return (
     <>
     <ReportCardRibbon
      fundamental={fundamental_area}
      checkmarksRequired={checkmarks_required}
      checkmarksCompleted={checkmarksCompleted}
      badge={stage}
      date={date}
     />
     <ReportCheckmarkList
       checkmarks={checkmarks}
       elements={elements}
     />
    </>
   )
 }
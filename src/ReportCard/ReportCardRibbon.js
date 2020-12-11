import React from "react"
import './ReportCardRibbon.css'

 export default function ReportCardRibbon({fundamental, badge ,checkmarksRequired, checkmarksCompleted, date}){

   return (
     <div className={`ReportCardRibbon ${date?'complete':''} ${fundamental.toLowerCase()[0]}`}>
        <span>{fundamental} {badge}</span>
        <div><span className='small'>Checkmarks required:</span><span>{checkmarksCompleted}/{checkmarksRequired}</span></div>
        {date?<span>Completed: {date}</span>:null}
     </div>
   )
 }
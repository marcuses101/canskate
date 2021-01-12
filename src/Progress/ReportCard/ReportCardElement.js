import React from "react"
import './ReportCardElement.css'

 export default function ReportCardElement({description, date}){
   return (
     <div className={`ReportCardElement ${date?'complete':''}`} >
      <span>{description}</span>
      <span>{date}</span>
     </div>
   )
 }
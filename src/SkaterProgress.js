import React from "react"
import ReportCard from './ReportCard/ReportCard'
import {Link} from 'react-router-dom'
import useSkaterFromParamId from "./Hooks/useSkaterFromParamId"

 export default function SkaterProgress(){
   const skater = useSkaterFromParamId();
   return (
     <div className="SkaterProgress">
        <h2>{skater.fullname}</h2>
       <ul className='links'>
         <li><Link to={`/eval/skater/${skater.id}`}>Go to Evaluation</Link></li>
       </ul>
        <ReportCard skater={skater} />
     </div>
   )
 }
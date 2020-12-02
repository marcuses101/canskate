import React from "react"
import {Link} from "react-router-dom"

 export default function Eval(){
   return (
     <div className="Eval">
      <h1>Evals</h1>
      <ul>
        <li><Link to='/eval/skater'>Skater List</Link></li>
        <li><Link to='/eval/element'>Element Evaluation</Link></li>
      </ul>
     </div>
   )
 }
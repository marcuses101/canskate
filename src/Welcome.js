import React from "react"
import {Link} from 'react-router-dom'


 export default function Welcome(){
   return (
     <div className="Welcome">
        <h2>What would you like to do?</h2>
        <ul>
          <li><Link to="/eval">Evaluate</Link></li>
          <li><Link to='/progress'>View Progress</Link></li>
          <li><Link to="/manage">Manage Sessions/Groups/Skaters</Link></li>
        </ul>
     </div>
   )
 }
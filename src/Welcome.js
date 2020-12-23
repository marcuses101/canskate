import React from "react"
import {Link} from 'react-router-dom'


 export default function Welcome(){
   return (
     <div className="Welcome">
        <h2>What would you like to do?</h2>
        <ul className='links'>
          <li><Link to="/eval">Evaluate</Link></li>
          <li><Link to='/progress'>View Progress</Link></li>
          <li><Link to="/manage">Manage Sessions/Groups/Skaters</Link></li>
          <li><Link to='/distribution'>Distribute Ribbons/Badges</Link></li>
        </ul>
     </div>
   )
 }
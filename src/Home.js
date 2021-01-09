import React from "react"
import {Link} from 'react-router-dom'
import { useSessions } from "./Hooks/useSessions"

 export default function Home(){
   const sessions = useSessions();
    if (!Object.entries(sessions).length) return(
      <div className="Home">
        <h2>Please start by creating a session</h2><br/>
        <Link to='/manage/session/add'>Add Session</Link>
      </div>
    )

   return (
     <div className="Home">
      <h2>What would you like to do?</h2>
      <ul className="links">
        <li>
          <Link to="/eval">Evaluate</Link>
        </li>
        <li>
          <Link to="/progress">View Progress</Link>
        </li>
        <li>
          <Link to="/manage">Manage Sessions/Groups/Skaters</Link>
        </li>
        <li>
          <Link to="/distribution">Distribute Ribbons/Badges</Link>
        </li>
      </ul>
     </div>
   )
 }
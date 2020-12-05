import React, {useContext} from "react"
import {Link, useRouteMatch, Switch, Route} from 'react-router-dom'
import Context from '../Context';

 export default function SessionEvalList(){
   const {club: {sessions}} = useContext(Context);
   const {path} = useRouteMatch();
   console.log(sessions)
   return (
         <div className="SessionEvalList">
        <h2>Choose a session</h2>
        <ul>{sessions.map(session=>{
          return <li key={session.id}><Link to={`${path}/${session.id}`}>{`${session.day} ${session.start_time.substring(0,5)}`}</Link></li>
        })}</ul>
     </div>
   )
 }

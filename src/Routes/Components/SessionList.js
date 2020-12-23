import React, {useContext} from "react"
import {Link, useRouteMatch} from 'react-router-dom'
import Context from '../../Context';

 export default function SessionList(){
   const {club: {sessions}} = useContext(Context);
   const {path} = useRouteMatch();
   return (
         <div className="SessionList">
        <h2>Choose a session</h2>
        <ul>{Object.values(sessions).map(session=>{
          return <li key={session.id}><Link to={`${path}/${session.id}`}>{`${session.day} ${session.start_time.substring(0,5)}`}</Link></li>
        })}</ul>
     </div>
   )
 }

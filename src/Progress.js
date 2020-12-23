import React from "react"
import SkaterList from './Routes/Components/SkaterList'
import SkaterProgress from './SkaterProgress'
import GroupList from './Routes/Components/GroupList'
import {Switch, Route, Link, useRouteMatch} from 'react-router-dom'
import SessionList from "./Routes/Components/SessionList";

 export default function Progress(){
   const {path} = useRouteMatch();
   return (
     <Switch>
       <Route path={`${path}/skater/:skater_id`} component={SkaterProgress} />
       <Route path={`${path}/skater`} component={SkaterList} />
       <Route path={`${path}/session/:session_id`} component={GroupList}/>
       <Route path={`${path}/session`} component={SessionList}/>
       <Route>
         <div className="Progress">
      <h1>Progress Reports</h1>
      <h2>Coming Soon</h2>
      <ul>
        <li><Link to={`${path}/skater`}>All Skaters</Link></li>
        <li>
          <Link to={`${path}/session`}>Sessions</Link>
        </li>
      </ul>
     </div>
       </Route>
     </Switch>

   )
 }
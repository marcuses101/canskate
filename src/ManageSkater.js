import React from "react"
import {Link, Route, Switch, useRouteMatch} from 'react-router-dom'
import AddSkaterForm from "./forms/AddSkaterForm";

 export default function ManageSkater(){
   const {path}= useRouteMatch();

   return (
        <Switch>
          <Route path={`${path}/add`} component={AddSkaterForm} />
          <Route path={`${path}/edit`} />
          <Route >
            <div className="ManageSkater">
              <ul>
                <li>
                  <Link to={`${path}/add`}>Add Skater</Link>
                </li>
                <li>
                  <Link to={`${path}/edit`}>Edit Skater</Link>
                </li>
              </ul>
            </div>
          </Route>
        </Switch>
   )
 }
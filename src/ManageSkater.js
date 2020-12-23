import React from "react"
import {Link, Route, Switch, useRouteMatch} from 'react-router-dom'
import SkaterList from "./Routes/Components/SkaterList";
import AddSkaterForm from "./forms/AddSkaterForm";
import EditSkaterForm from './forms/EditSkaterForm'

 export default function ManageSkater(){
   const {path}= useRouteMatch();

   return (
        <Switch>
          <Route path={`${path}/add`} component={AddSkaterForm} />
          <Route path={`${path}/edit/:skater_id`} component={EditSkaterForm} />
          <Route path={`${path}/edit`} component={SkaterList}/>
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
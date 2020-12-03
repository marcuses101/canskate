import React from "react"
import {Switch, Route} from "react-router-dom"
import HeaderContent from './Headers/HeaderContent'
import SkaterEvalHeader from "./Headers/SkaterEvalHeader"
import './Header.css'

 export default function Header({openNav}){

   return (
     <div className="Header">
     <Switch>
      <Route path="/eval/skater/:id">
        <SkaterEvalHeader openNav={openNav}/>
      </Route>
      <Route path="/eval/skater" >
        <HeaderContent title="Skater List" openNav={openNav}/>
      </Route>
      <Route path='/eval/element'>
        <HeaderContent title="Element Evaluation" openNav={openNav}/>
      </Route>
      <Route path='/'>
        <HeaderContent title="Canskate Management" openNav={openNav}/>
      </Route>
     </Switch>
     </div>
   )
 }
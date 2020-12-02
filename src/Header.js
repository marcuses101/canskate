import React from "react"
import {Switch, Route} from "react-router-dom"
import useSkaterFromParamId from "./Hooks/useSkaterFromParamId";
import HeaderContent from './Headers/HeaderContent'
import SkaterListHeader from './Headers/SkaterListHeader'
import ElementEvalHeader from './Headers/ElementEvalHeader'
import SkaterEvalHeader from "./Headers/SkaterEvalHeader"

 export default function Header(){
   
   return (
     <div className="Header">
     <Switch>
      <Route path="/eval/skater/:id" component={SkaterEvalHeader}/>
      <Route path="/eval/skater" component={SkaterListHeader}/>
      <Route path='/eval/element' component={ElementEvalHeader} />
     </Switch>
     </div>
   )
 }
import React, {useEffect,useRef} from "react"
import {Switch, Route} from "react-router-dom"
import HeaderContent from './Headers/HeaderContent'
import SkaterEvalHeader from "./Headers/SkaterEvalHeader"
import './Header.css'

 export default function Header({openNav}){
   const header = useRef();
   // set offset for main content based on header height
   useEffect(()=>{
    const offset = header.current?.getBoundingClientRect().height + 16;
    document.documentElement.style.setProperty('--header-height',`${offset}px`)
   })

   return (
     <div ref={header} className="Header">
     <Switch>
      <Route path="/eval/skater/:id">
        <SkaterEvalHeader openNav={openNav}/>
      </Route>
      <Route path="/eval/skater" >
        <HeaderContent title="Skater List" openNav={openNav}/>
      </Route>
      <Route path={['/eval/element','/eval/session/:session_id/group/:group_id']}>
        <HeaderContent title="Element Evaluation" openNav={openNav} showFilter={true}/>
      </Route>
      <Route path='/'>
        <HeaderContent title="Canskate Management" openNav={openNav} showFilter={false}/>
      </Route>
     </Switch>
     <div id="filter"></div>
     </div>
   )
 }
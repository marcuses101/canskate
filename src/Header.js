import React, {useEffect,useRef} from "react"
import {Switch, Route} from "react-router-dom"
import HeaderContent from './Headers/HeaderContent'
import SkaterEvalHeader from "./Headers/SkaterEvalHeader"
import './Header.css'

 export default function Header({openNav}){
   const header = useRef();

   const resize = new ResizeObserver(([entry])=>{
    const offset = entry.borderBoxSize[0].blockSize + 16
    document.documentElement.style.setProperty('--header-height',`${offset}px`)
    });
    
   useEffect(()=>{
     const target = header.current
     resize.observe(target)
     return ()=>{resize.unobserve(target)}
   })

   return (
     <div ref={header} className="Header">
     <Switch>
      <Route path="/eval/skater/:skater_id">
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
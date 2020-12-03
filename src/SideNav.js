import React, {useRef,useEffect} from "react"
import {Link} from 'react-router-dom'
import './SideNav.css'

 export default function SideNav({open, closeNav}){
   const sidenav = useRef(null);

   // close nav on click outside
   useEffect(()=>{
     function logClickInside(event){
      if (!sidenav.current.contains(event.target)) {
        event.stopPropagation();
        closeNav()}
     }
     if (open) document.addEventListener('click',logClickInside,{capture:true})
     else document.removeEventListener('click', logClickInside,{capture:true});
     return ()=>document.removeEventListener('click',logClickInside,{capture:true})
    },[open, closeNav])
   return (
     <nav className={`SideNav ${open?'open':'closed'}`} ref={sidenav}>
      <ul>
        <li onClick={closeNav}><Link to='/eval/skater'>Eval Skaters</Link></li>
        <li onClick={closeNav}><Link to='/eval/element'>Eval Element</Link></li>
      </ul>
     </nav>
   )
 }
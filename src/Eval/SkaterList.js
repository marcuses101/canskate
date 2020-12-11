import React, {useContext} from "react"
import {Link, useRouteMatch} from 'react-router-dom'
import Context from '../Context'
import "./SkaterList.css";

 export default function SkaterList(){
   const {path} = useRouteMatch();
   const {skaters,isFilterOpen} = useContext(Context)
   const skaterLinks = skaters.map(skater=>{
     return <li key={skater.id}><Link to={`${path}/${skater.id}`} >{skater.fullname}</Link></li>
   })
   return (
     <div className="SkaterList">
        {isFilterOpen && <h2>Filter Open</h2>}
        <ul>{skaterLinks}</ul>
     </div>
   )
 }
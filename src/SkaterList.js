import React, {useContext} from "react"
import {Link} from 'react-router-dom'
import Context from './Context'
import "./SkaterList.css";

 export default function SkaterList(){
   const {skaters,isFilterOpen} = useContext(Context)
   const skaterLinks = skaters.map(skater=>{
     return <li key={skater.id}><Link to={`/eval/skater/${skater.id}`} >{skater.fullname}</Link></li>
   })
   return (
     <div className="SkaterList">
        {isFilterOpen && <h2>Filter Open</h2>}
        <ul>{skaterLinks}</ul>
     </div>
   )
 }
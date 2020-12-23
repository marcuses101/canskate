import React, {useContext} from "react"
import {Link, useRouteMatch} from 'react-router-dom'
import Context from '../../Context'

 export default function SkaterList(){
   const {path} = useRouteMatch();
   const {skaters,isFilterOpen} = useContext(Context)
   const skaterLinks = skaters.map(skater=>{
     return <li style={{flexGrow:1}} key={skater.id}><Link to={`${path}/${skater.id}`} >{skater.fullname}</Link></li>
   })
   return (
     <div className="SkaterList">
      <h2>Choose a skater:</h2>
        {isFilterOpen && <h2>Filter Open</h2>}
        <ul className="links" style={{display:'flex', flexWrap:'wrap', justifyContent:'stretch'}}>{skaterLinks}</ul>
     </div>
   )
 }
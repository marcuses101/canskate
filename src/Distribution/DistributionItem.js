import React from "react"

 export default function DistributionItem({name, badge, dateCompleted, ribbon, distribution}){
   return (
     <li className="DistributionItem">
        <span>{name} </span>
        {badge && <span className='badge'>{`Badge ${badge}`} </span>}
        {ribbon && <span className="ribbon">{ribbon} </span>}
        <span className='dateCompleted'> {dateCompleted} </span>
        <button onClick={distribution}>Distribute</button>
     </li>
   )
 }
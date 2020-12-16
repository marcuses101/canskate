import React from "react"
import dayjs from 'dayjs'
import './DistributionItem.css'

 export default function DistributionItem({name, badge, date, ribbon, distribution, date_distributed}){
   return (
     <li className="DistributionItem">
        <span>{name} </span>
        {badge && <span className='badge'>{`Badge ${badge}`} </span>}
        {ribbon && <span className="ribbon">{ribbon} </span>}
        <span className='dateCompleted'> {dayjs(date).format('DD/MM/YYYY')} </span>
        {date_distributed?<span>{dayjs(date_distributed).format('DD/MM/YYYY')}</span>:<button onClick={distribution}>Distribute</button>}
     </li>
   )
 }


import React from "react"
import {useLogElement} from '../../Hooks/useLogElement'
import './SkaterButton.css'

 export default function SkaterButton({skater, elementId}){
   const log = useLogElement(skater.id, elementId)

   return (
     <li onClick={log} className="SkaterButton">
        <span>{skater.fullname}</span>
     </li>
   )
 }
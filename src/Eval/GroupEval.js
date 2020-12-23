import React from "react"
import ElementEval from './ElementEval'
import {useGroupFromParamId} from '../Hooks/useGroupFromParamId'
import { useClubSkaters } from "../Hooks/useClubSkaters";
import { useSessionFromParamId } from "../Hooks/useSessionFromParamId";

 export default function GroupEval(){
    const group = useGroupFromParamId();
    const session = useSessionFromParamId();
    const skaters = useClubSkaters();
    const groupSkaters = group.skaters.map(skaterId=>skaters.find(skater=>skater.id===skaterId));
   return (
<> <h2>{session.day} {session.start_time.slice(0,5)}</h2>
    <h3 className='groupHeader' style={{backgroundColor: `var(--${group.group_color.toLowerCase()})`}}>{group.group_color} group</h3>
   <ElementEval groupSkaters={groupSkaters}/>
</>
   )
 }
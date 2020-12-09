import React from "react"
import AssignGroup from './AssignGroup'
import { useClubSkaters } from "../Hooks/useClubSkaters";
import { useSessionFromParamId } from "../Hooks/useSessionFromParamId"
import { useSessionGroups } from "../Hooks/useSessionGroups";

 export default function AssignSkatersToGroups(){
  const session = useSessionFromParamId();
  const groups = useSessionGroups(session.id)
  const assignedSkaters = groups.map(group=>group.skaters).flat();
  const sessionSkaters = useClubSkaters().filter(skater=>session.skaters.includes(skater.id))
  const unassignedSkaters = sessionSkaters.filter(skater=>!assignedSkaters.includes(skater.id))
  const groupComponents = groups.map(group=>{
    const groupSkaters = sessionSkaters.filter(skater=>group.skaters.includes(skater.id))
    return <AssignGroup key={group.id} name={group.group_color} group_id={group.id} skaters={groupSkaters} otherGroups={groups.filter(g=>g.id!==group.id)}/>
  })
   return (
     <ul className="AssignSkatersToGroups">
        {unassignedSkaters.length?<AssignGroup key='unassigned' name='Unassigned Skaters' skaters={unassignedSkaters} otherGroups={groups}/>:null}
        {groupComponents}
     </ul>
   )
 }
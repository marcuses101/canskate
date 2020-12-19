import React from "react"
import ElementEval from './ElementEval'
import {UseGroupFromParamId} from '../Hooks/useGroupFromParamId'
import { useClubSkaters } from "../Hooks/useClubSkaters";

 export default function GroupEval(){
    const group = UseGroupFromParamId();
    const skaters = useClubSkaters();
    const groupSkaters = group.skaters.map(skaterId=>skaters.find(skater=>skater.id===skaterId));
   return <ElementEval groupSkaters={groupSkaters}/>
 }
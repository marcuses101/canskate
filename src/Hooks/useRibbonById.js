import {useContext} from 'react'
import Context from '../Context'

export function useRibbonById (){
  const {ribbons} = useContext(Context);
  console.log({ribbons})
  return function (ribbonId) {
  return  ribbons.find(ribbon=>{
      console.log({ribbon,ribbonId})
     return  ribbon.id===ribbonId})
  }
}
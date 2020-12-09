import {useContext} from 'react'
import Context from '../Context'

export function useSessionGroups(session_id){
  const {club:{groups}} = useContext(Context)
  const sessionGroups = Object.values(groups).filter(group=>group.session_id===parseInt(session_id))
  console.log({sessionGroups})
  return sessionGroups;
}
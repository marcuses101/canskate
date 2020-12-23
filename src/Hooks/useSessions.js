import {useContext} from 'react';
import Context from '../Context'
export function useSessions(){
  const {club:{sessions}} = useContext(Context)
  return sessions
}
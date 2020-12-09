import {useContext} from 'react'
import Context from '../Context'
import {useParams} from 'react-router-dom';

export function useSessionFromParamId(){
  const {club: {sessions}} = useContext(Context);
  const {session_id} = useParams();
  return sessions[session_id];
}
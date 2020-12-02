import {useContext} from 'react'
import {useParams} from 'react-router-dom'
import Context from '../Context'

export default function useSkaterFromParamId() {
  const {id} = useParams();
  const {skaters} = useContext(Context);
  const skater_id = parseInt(id)
  const skater = skaters.find(skater=>skater.id===skater_id);
  return skater
}

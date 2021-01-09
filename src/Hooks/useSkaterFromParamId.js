import {useContext} from 'react'
import {useParams} from 'react-router-dom'
import Context from '../Context'

export default function useSkaterFromParamId() {
  const {skater_id} = useParams();
  const {skaters} = useContext(Context);
  const skater = skaters.find(skater=>skater.id===parseInt(skater_id)) || {};
  return skater
}

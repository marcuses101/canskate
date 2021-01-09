import {useContext} from 'react'
import {CLUB_ACTIONS} from '../services/clubReducer'
import {clubAPI} from '../API/clubAPI'
import Context from '../Context'

function useClubServices (){
  const {clubDispatch} = useContext(Context)
  const serviceObject = {
  }
  return serviceObject;
}
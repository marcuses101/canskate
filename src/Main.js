import React from "react"
import {Switch,Route} from 'react-router-dom'
import Progress from './Progress'
import Manage from './Manage'
import Eval from './Eval';
import Welcome from './Welcome'

 export default function Main(){
   return (
     <main className='Main'>
       <Switch>
        <Route path='/progress' component={Progress}/>
        <Route path='/manage' component={Manage}/>
        <Route path='/eval' component={Eval} />
        <Route path="/" component={Welcome}/>
      </Switch>
     </main>
   )
 }
import React , {useContext, useState} from "react"
import {SKATER_ACTIONS} from '../services/skaterReducer'
import dayjs from 'dayjs'
import {useHistory} from 'react-router-dom'
import Context from "../Context";
import useSkaterFromParamId from "../Hooks/useSkaterFromParamId"

 export default function EditSkaterForm(){
   const skater = useSkaterFromParamId();
   const {skatersDispatch}= useContext(Context)
   const [fullName, setFullName] = useState(skater.fullname);
   const [birthdate, setBirthdate] = useState(dayjs(skater.birthdate).format('YYYY-MM-DD'));
   const [gender, setGender] = useState(skater.gender);
   const history = useHistory();
   function handleSubmit(e){
     e.preventDefault();
     const editedSkater = {
       id: skater.id,
       fullname: fullName,
       gender: gender,
       birthdate:birthdate,
     }
     skatersDispatch({type: SKATER_ACTIONS.EDIT_SKATER, payload:editedSkater});
     setFullName('')
     setBirthdate('');
     setGender(null);
     history.push(`/eval/skater/${skater.id}`)
   }

   return (
     <form className="SkaterForm" onSubmit={handleSubmit}>
       <label htmlFor="fullname">Full Name:</label>
       <input
         type="text"
         id="fullname"
         value={fullName}
         onChange={(e) => setFullName(e.target.value)}
       />
       <br />
       <label htmlFor="birthdate">Birthdate:</label>
       <input
         type="date"
         id="birthdate"
         value={birthdate}
         onChange={(e) => setBirthdate(e.target.value)}
       />
       <br />
       <label htmlFor="male">Male</label>
       <input
         type="radio"
         name="gender"
         id="male"
         value="Male"
         checked={gender === "Male"}
         onChange={(e) => setGender(e.target.value)}
       />
       <br />
       <label htmlFor="female">Female</label>
       <input
         type="radio"
         name="gender"
         id="female"
         value="Female"
         checked={gender === "Female"}
         onChange={(e)=>setGender(e.target.value)}
       />
       <br />
       <input type="submit" value="Submit"/>
     </form>
   );
 }
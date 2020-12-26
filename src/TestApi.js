import React, { useState } from "react";
import {skaterAPI} from './API/skaterAPI'

export default function TestApi() {
  const [message, setMessage] = useState("default message");

  async function handleAddSkater(){
    const newSkater = {
      fullname: "James Marcus Connolly",
      gender: 'Male',
      birthdate: '2014-08-14'
    }
   const response =  await skaterAPI.addSkater(newSkater);
   console.log(response)
  }
  async function handleEditSkater(){
    const editedSkater = {
      id: 204,
      fullname: "James Connolly",
      gender: 'Male',
    }
  const response = await skaterAPI.editSkater(editedSkater)
  console.log(response)
  }

  return (
    <div className="TestApi">
      <h2>Hello tests</h2>
      <button onClick={handleAddSkater}>add skater</button>
      <button onClick={handleEditSkater}>edit skater</button>
      <p>{message}</p>
    </div>
  );
}

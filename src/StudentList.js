import React, { useContext } from "react";
import Context from "./Context"
import StudentListItem from "./StudentListItem";

export default function StudentList({ students = [] }) {
  const thecontext = useContext(Context)
  console.log(thecontext)

  const listElements = students.map(({ name, id }) => (
    <StudentListItem name={name} key={id} />
  ));

  return <ul className="StudentList">{listElements}</ul>;
}

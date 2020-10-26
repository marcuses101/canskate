import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./Form";
import StudentList from "./StudentList";
import Context from "./Context";
const URL = "http://localhost:9090/students";
const elementsURL =
  "https://spreadsheets.google.com/feeds/cells/11GWEopfEDcKGqxiGMAOQuAwupvUYXYhhGVrGQIfD8sM/1/public/basic?alt=json";

function App() {
  const [students, setStudents] = useState([]);
  const [elements, setElements] = useState([]);

  async function getData(url, setFunc) {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Fetch failed");
    const data = await response.json();
    const entries = data.feed.entry;
    const elements = [];
    for (let i = 5; i < entries.length; i += 5) {
      elements.push({
        badge: entries[i].content.$t,
        category: entries[i + 1].content.$t,
        elementNumber:
          entries[i + 2].content.$t + "-" + entries[i + 3].content.$t,
        description: entries[i + 4].content.$t,
      });
    }
    setFunc(elements);
  }
  useEffect(() => {
    getData(elementsURL, setElements).catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <Form />
      <StudentList students={students} />
    </div>
  );
}
export default App;

import React, { Component } from "react";
import Context from "./Context"
const postURL = "http://localhost:9090/students";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.handleChange = this.handleChange.bind(this)
  }
  static contextType = Context

  handleChange (event) {
    this.setState({ name: event.target.value });
  };

  postStudent = async (name) => {
    const response = await fetch(postURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });
    if(!response.ok) throw new Error("post failed :(")
    const data = await response.json();
    console.log(data);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit fired");
    this.postStudent(this.state.name).catch(e=>console.log(e))
  }
  breakThis=()=>{
    console.log(this)
  }

  render() {
    console.log("Class based context: "+this.context.name)
    return (
      <form className="Form" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" onChange={this.handleChange} />
        <input type="submit" value="submit" />
        <button onClick={this.breakThis}>Break this</button>
      </form>
    );
  }
}

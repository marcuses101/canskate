import { internet } from "faker";
import React from "react";
import ReactDOM from 'react-dom'
import Form from "./Form";
import {shallow} from 'enzyme'
import "@testing-library/jest-dom"

describe("Form component", () => {
  it("mounts and unmounts without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Form/>,div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("state updates onChange",()=>{
    const wrapper = shallow(<Form/>);
    const input = wrapper.find("#name");
    input.simulate("change",{target: {value:"hello"}})
    expect(wrapper.state().name).toBe("hello")
  })
});

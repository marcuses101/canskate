import React from 'react'
import ReactDOM from 'react-dom'
import {MemoryRouter} from 'react-router-dom'
import Main from './Main'

it('renders without crashing', () => {
  const div = document.createElement('div');
  HTMLElement.prototype.scrollTo = ()=>{};
  ReactDOM.render(<MemoryRouter><Main /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
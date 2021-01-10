import React from 'react'
import ReactDOM from 'react-dom'
import {MemoryRouter} from 'react-router-dom'
import AssignSkater from './AssignSkater'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><AssignSkater /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
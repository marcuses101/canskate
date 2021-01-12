import React from 'react'
import ReactDOM from 'react-dom'
import {MemoryRouter} from 'react-router-dom'
import ManageSkater from './ManageSkater'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ManageSkater /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
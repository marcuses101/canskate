import React from 'react'
import ReactDOM from 'react-dom'
import {MemoryRouter} from 'react-router-dom'
import Manage from './Manage'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Manage /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
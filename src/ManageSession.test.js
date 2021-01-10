import React from 'react'
import ReactDOM from 'react-dom'
import {MemoryRouter} from 'react-router-dom'
import ManageSession from './ManageSession'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ManageSession /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
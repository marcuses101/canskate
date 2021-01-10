import React from 'react'
import ReactDOM from 'react-dom'
import {MemoryRouter} from 'react-router-dom'
import AssignSkatersToGroups from './AssignSkatersToGroups'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><AssignSkatersToGroups /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
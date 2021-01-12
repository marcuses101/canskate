import React from 'react'
import ReactDOM from 'react-dom'
import {MemoryRouter} from 'react-router-dom'
import HeaderContent from './HeaderContent'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><HeaderContent /></MemoryRouter>, div);
ReactDOM.unmountComponentAtNode(div);
});
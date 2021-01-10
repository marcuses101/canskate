import React from 'react'
import ReactDOM from 'react-dom'
import {MemoryRouter} from 'react-router-dom'
import SkaterEvalHeader from './SkaterEvalHeader'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><SkaterEvalHeader /></MemoryRouter>, div);
ReactDOM.unmountComponentAtNode(div);
});
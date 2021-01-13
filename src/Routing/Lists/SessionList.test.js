import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import SessionList from './SessionList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><SessionList /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
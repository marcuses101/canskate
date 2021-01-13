import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import ClubRouter from './ClubRouter';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><ClubRouter /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
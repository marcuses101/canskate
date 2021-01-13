import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import ManagementRouter from './ManagementRouter';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><ManagementRouter /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
import React from 'react';
import ReactDOM from 'react-dom';
import AssignGroup from './AssignGroup';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AssignGroup />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
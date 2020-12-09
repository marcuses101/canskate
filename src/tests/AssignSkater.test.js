import React from 'react';
import ReactDOM from 'react-dom';
import AssignSkater from './AssignSkater';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AssignSkater />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
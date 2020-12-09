import React from 'react';
import ReactDOM from 'react-dom';
import AssignGroups from '../Assign/AssignGroup';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AssignGroups />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

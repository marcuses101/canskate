import React from 'react';
import ReactDOM from 'react-dom';
import AssignSkatersToGroups from '../AssignSkatersToGroups';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AssignSkatersToGroups />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

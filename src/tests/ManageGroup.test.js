import React from 'react';
import ReactDOM from 'react-dom';
import ManageGroup from './ManageGroup';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ManageGroup />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
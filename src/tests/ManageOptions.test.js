import React from 'react';
import ReactDOM from 'react-dom';
import ManageOptions from './ManageOptions';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ManageOptions />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
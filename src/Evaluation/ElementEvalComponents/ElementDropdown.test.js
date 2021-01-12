import React from 'react';
import ReactDOM from 'react-dom';
import ElementDropdown from './ElementDropdown';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ElementDropdown />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
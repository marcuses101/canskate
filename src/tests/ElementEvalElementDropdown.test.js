import React from 'react';
import ReactDOM from 'react-dom';
import ElementEvalElementDropdown from './ElementEvalElementDropdown';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ElementEvalElementDropdown />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
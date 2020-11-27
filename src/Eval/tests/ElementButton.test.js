import React from 'react';
import ReactDOM from 'react-dom';
import ElementButton from '../ElementButton';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ElementButton />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

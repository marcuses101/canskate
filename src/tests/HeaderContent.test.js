import React from 'react';
import ReactDOM from 'react-dom';
import HeaderContent from './HeaderContent';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HeaderContent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
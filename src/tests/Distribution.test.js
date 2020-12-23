import React from 'react';
import ReactDOM from 'react-dom';
import Distribution from './Distribution';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Distribution />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
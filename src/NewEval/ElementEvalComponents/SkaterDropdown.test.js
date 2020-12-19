import React from 'react';
import ReactDOM from 'react-dom';
import SkaterDropdown from './SkaterDropdown';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SkaterDropdown />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
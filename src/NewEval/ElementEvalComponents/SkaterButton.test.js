import React from 'react';
import ReactDOM from 'react-dom';
import SkaterButton from './SkaterButton';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SkaterButton />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
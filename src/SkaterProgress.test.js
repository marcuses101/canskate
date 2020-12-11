import React from 'react';
import ReactDOM from 'react-dom';
import SkaterProgress from './SkaterProgress';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SkaterProgress />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
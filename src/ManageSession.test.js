import React from 'react';
import ReactDOM from 'react-dom';
import ManageSession from './ManageSession';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ManageSession />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
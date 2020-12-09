import React from 'react';
import ReactDOM from 'react-dom';
import ElementEval from './ElementEval';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ElementEval />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
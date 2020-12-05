import React from 'react';
import ReactDOM from 'react-dom';
import GroupEval from './GroupEval';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GroupEval />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
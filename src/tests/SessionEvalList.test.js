import React from 'react';
import ReactDOM from 'react-dom';
import SessionEval from './SessionEval';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SessionEval />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
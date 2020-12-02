import React from 'react';
import ReactDOM from 'react-dom';
import ElementEvalHeader from './ElementEvalHeader';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ElementEvalHeader />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
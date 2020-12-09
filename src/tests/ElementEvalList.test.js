import React from 'react';
import ReactDOM from 'react-dom';
import ElementEvalList from './ElementEvalList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ElementEvalList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
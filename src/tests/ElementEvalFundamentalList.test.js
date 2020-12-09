import React from 'react';
import ReactDOM from 'react-dom';
import ElementEvalFundamentalList from './ElementEvalFundamentalList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ElementEvalFundamentalList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
import React from 'react';
import ReactDOM from 'react-dom';
import FundamentalElementList from '../Eval/FundamentalElementList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FundamentalElementList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

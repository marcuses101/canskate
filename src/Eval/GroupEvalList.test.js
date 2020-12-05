import React from 'react';
import ReactDOM from 'react-dom';
import GroupEvalList from './GroupEvalList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GroupEvalList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
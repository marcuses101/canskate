import React from 'react';
import ReactDOM from 'react-dom';
import ElementEvalBadgeList from './ElementEvalBadgeList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ElementEvalBadgeList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
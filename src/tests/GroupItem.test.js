import React from 'react';
import ReactDOM from 'react-dom';
import GroupItem from './GroupItem';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GroupItem />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
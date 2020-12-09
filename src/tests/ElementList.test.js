import React from 'react';
import ReactDOM from 'react-dom';
import ElementList from '../ElementList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ElementList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

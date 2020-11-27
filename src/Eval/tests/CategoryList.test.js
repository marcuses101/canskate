import React from 'react';
import ReactDOM from 'react-dom';
import CategoryList from '../CategoryList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CategoryList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

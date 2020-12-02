import React from 'react';
import ReactDOM from 'react-dom';
import SkaterList from './SkaterList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SkaterList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
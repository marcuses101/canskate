import React from 'react';
import ReactDOM from 'react-dom';
import StudentListItem from './StudentListItem';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StudentListItem />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
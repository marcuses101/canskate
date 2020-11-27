import React from 'react';
import ReactDOM from 'react-dom';
import GroupForm from './GroupForm';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GroupForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
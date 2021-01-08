import React from 'react';
import ReactDOM from 'react-dom';
import AddUserForm from './AddUserForm';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddUserForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
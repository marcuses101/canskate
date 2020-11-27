import React from 'react';
import ReactDOM from 'react-dom';
import SessionForm from './SessionForm';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SessionForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
import React from 'react';
import ReactDOM from 'react-dom';
import AddClubForm from './AddClubForm';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddClubForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
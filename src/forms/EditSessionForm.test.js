import React from 'react';
import ReactDOM from 'react-dom';
import EditSessionForm from './EditSessionForm';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EditSessionForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
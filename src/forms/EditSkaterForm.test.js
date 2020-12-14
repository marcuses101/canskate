import React from 'react';
import ReactDOM from 'react-dom';
import EditSkaterForm from './EditSkaterForm';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EditSkaterForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
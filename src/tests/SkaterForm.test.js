import React from 'react';
import ReactDOM from 'react-dom';
import SkaterForm from './SkaterForm';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SkaterForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
import React from 'react';
import ReactDOM from 'react-dom';
import ElementEval from './ElementEval';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const filterContainer = document.createElement('div');
    filterContainer.setAttribute('id', 'filterContainer');
    document.body.appendChild(filterContainer)
    ReactDOM.render(<ElementEval />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

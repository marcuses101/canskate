import React from 'react';
import ReactDOM from 'react-dom';
import ElementFundamentals from './ElementFundamentals';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ElementFundamentals />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
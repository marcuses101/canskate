import React from 'react';
import ReactDOM from 'react-dom';
import ReportCheckmark from './ReportCheckmark';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReportCheckmark />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
import React from 'react';
import ReactDOM from 'react-dom';
import ReportCheckmarkComponent from './ReportCheckmarkComponent';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReportCheckmarkComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
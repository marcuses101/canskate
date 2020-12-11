import React from 'react';
import ReactDOM from 'react-dom';
import ReportRibbonComponent from './ReportRibbonComponent';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReportRibbonComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
import React from 'react';
import ReactDOM from 'react-dom';
import ReportCardRibbon from './ReportCardRibbon';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReportCardRibbon />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
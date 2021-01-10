import React from 'react';
import ReactDOM from 'react-dom';
import ReportBadgeComponent from './ReportBadgeComponent';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReportBadgeComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
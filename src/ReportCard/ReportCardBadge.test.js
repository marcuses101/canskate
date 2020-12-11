import React from 'react';
import ReactDOM from 'react-dom';
import ReportCardBadge from './ReportCardBadge';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReportCardBadge />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
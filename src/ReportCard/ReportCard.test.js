import React from 'react';
import ReactDOM from 'react-dom';
import ReportCard from './ReportCard';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReportCard />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
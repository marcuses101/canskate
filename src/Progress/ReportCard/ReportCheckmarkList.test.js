import React from 'react';
import ReactDOM from 'react-dom';
import ReportCheckmarkList from './ReportCheckmarkList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReportCheckmarkList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
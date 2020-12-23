import React from 'react';
import ReactDOM from 'react-dom';
import ReportRibbonList from './ReportRibbonList';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReportRibbonList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
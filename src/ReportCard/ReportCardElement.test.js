import React from 'react';
import ReactDOM from 'react-dom';
import ReportCardElement from './ReportCardElement';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReportCardElement />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
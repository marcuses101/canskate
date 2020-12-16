import React from 'react';
import ReactDOM from 'react-dom';
import DistributionFilter from './DistributionFilter';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DistributionFilter />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  